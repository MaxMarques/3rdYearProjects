module Lib(evalE, errorMessage) where

import Data.Maybe
import Control.Applicative
import Data.Char
import System.Environment
import Control.Monad
import Text.Read
import Prelude
import Data.Functor
import Control.Monad
import System.Exit
import Text.Printf

data Parser a = Parser { 
    runParser :: String -> Maybe (a, String) 
}

data Expression = Add Expression Expression
                | Sub Expression Expression
                | Mul Expression Expression
                | Div Expression Expression
                | Pow Expression Expression
                | Lit Double deriving(Show)

instance Functor Parser where
    fmap fct parser = Parser $ \ str ->  case runParser (parser) str of
                                        Just (a, b) -> Just (fct a, b)
                                        Nothing -> Nothing
instance Applicative Parser where
    pure elem = Parser $ \ str -> Just (elem, str)
    elem1 <*> elem2 = Parser $ \ str -> do
                                        (e1, s1) <- runParser (elem1) str
                                        (e2, s2) <- runParser (elem2) s1
                                        Just (e1 e2, s2)
instance Alternative Parser where
    empty = Parser $ \ str -> Nothing
    elem1 <|> elem2 = Parser $ \ str -> runParser (elem1) str <|> runParser (elem2) str

instance Monad Parser where
    elem1 >>= elem2 = Parser $ \ str -> do
                                        (c, s) <- runParser (elem1) str
                                        runParser (elem2 c) s

parseChar :: Char -> Parser Char
parseChar c = Parser $ \ str -> par c str
par :: Char -> String -> Maybe (Char, String)
par c (x:xs)
            | (c == x) = Just(c, xs)
            | otherwise = Nothing
par _ [] = Nothing

parseAnyChar :: String -> Parser Char
parseAnyChar s = Parser $ \ str -> f s str
f :: String -> String -> Maybe (Char, String)
f [] (x:xs) = Nothing
f _ [] = Nothing
f (a:as) (x:xs)
    | (a /= x) = f as (x:xs)
    | (a == x) = Just(a, xs)

parseOr :: Parser a -> Parser a -> Parser a
parseOr pc1 pc2 = Parser $ \ str -> runParser (pc1) str <|> runParser (pc2) str

parseAnd :: Parser a -> Parser b -> Parser (a, b)
parseAnd pc1 pc2 = Parser $ \ str -> d pc1 pc2 str
d :: Parser a -> Parser b -> String -> Maybe ((a, b), String)
d pc1 pc2 str = do
    (c1, s1) <- runParser (pc1) str
    (c2, s2) <- runParser (pc2) s1
    Just((c1, c2), s2)

parseAndWith :: (a -> b -> c) -> Parser a -> Parser b -> Parser c
parseAndWith func pc1 pc2 = Parser $ \ str -> t func pc1 pc2 str
t :: (t1 -> t2 -> a) -> Parser t1 -> Parser t2 -> String -> Maybe (a, String)
t func pc1 pc2 str = do
    (c1, s1) <- runParser (pc1) str
    (c2, s2) <- runParser (pc2) s1
    Just(func c1 c2, s2)

parseMany :: Parser a -> Parser [a]
parseMany pc1 = Parser $ \ str -> z (runParser(pc1)) str []
    where z pc1 str acc = case pc1 str of
                            Just (c, str') -> z pc1 str' (acc ++ [c])
                            Nothing -> Just (acc, str)

parseSome :: Parser a -> Parser [a]
parseSome pc1 = Parser $ \ str -> y pc1 str
    where
        y pc1 str = do
            ((c1, c2), str') <- runParser (parseAnd pc1 (parseMany pc1)) str
            Just (c1:c2, str')

parseUInt :: Parser Int
parseUInt = Parser $ \ str -> x str
    where
        x str = do
            (tmp, tmp2) <- runParser (parseSome (parseAnyChar ['0'..'9'])) str
            Just (read tmp::Int, tmp2)

parseInt :: Parser Int
parseInt = Parser $ \ str -> w str
w :: String -> Maybe (Int, String)
w str = case runParser (parseChar '-') str of
            Just (c, s) -> runParser (parseUInt) s >>= (\ (num, str') -> Just (num * (-1), str'))
            Nothing -> runParser (parseUInt) str

parseTuple :: Parser a -> Parser (a, a)
parseTuple func = Parser $ \ str -> m (runParser (func)) str
m :: (String -> Maybe (b, String)) -> String -> Maybe ((b, b), String)
m func str = do
    (p1, ptmp1) <- runParser (parseChar '(') str
    (nb1, nbtmp1) <- func ptmp1
    (v, vtemp) <- runParser (parseChar ',') nbtmp1
    (nb2, nbtmp2) <- func vtemp
    (p2, ptmp2) <- runParser (parseChar ')') nbtmp2
    Just ((nb1, nb2), ptmp2)

parseDouble :: Parser Double
parseDouble = Parser $ \ str -> e str
e :: String -> Maybe (Double, String)
e str = do
    (tmp, tmp2) <- runParser (parseSome (parseAnyChar "0123456789.")) str
    Just (read tmp::Double, tmp2)

parseDoubleN :: Parser Double
parseDoubleN = Parser $ \ str -> r str
r :: String -> Maybe (Double, String)
r str = case runParser (parseChar '-') str of
            Just (c, s) -> runParser (parseDouble) s >>= (\ (num, str') -> Just (num * (-1), str'))
            Nothing -> runParser (parseDouble) str

calc :: Expression -> Maybe Double
calc expr = case expr of
                Add n1 n2 -> (+) <$> calc n1 <*> calc n2
                Sub n1 n2 -> (-) <$> calc n1 <*> calc n2
                Mul n1 n2 -> (*) <$> calc n1 <*> calc n2
                Div n1 n2 -> case n2 of
                                Lit 0 -> Nothing
                                nom -> (/) <$> calc n1 <*> calc n2                  
                Pow n1 n2 -> (**) <$> calc n1 <*> calc n2
                Lit n -> Just (n)

computeExpr :: Parser Expression
computeExpr = add
    where
        add = manager Add (parseChar '+') sub
        sub = manager Sub (parseChar '-' ) mul
        mul = manager Mul (parseChar '*') div
        div = manager Div (parseChar '/') pow
        pow = manager Pow (parseChar '^') fac
        fac = par <|> lit
        par = parseChar '(' *> computeExpr <* parseChar ')'
        lit = Lit <$> (parseDouble <|> parseDoubleN)
        manager oper1 pars oper2 = oper2 >>= exec
            where
                exec ex = ((oper1 ex <$> (pars *> oper2)) >>= exec) <|> return ex

errorMessage :: IO ()
errorMessage = putStrLn "Error Expression" >> exitWith (ExitFailure 84) 

evalE :: String -> Maybe Double
evalE str = do
            (c, s) <- runParser (computeExpr) (concat $ words str)
            case s of
                [] -> case calc c of
                        Just (n) -> Just (n)
                        Nothing -> Nothing
                s -> Nothing