module Main where

import Lib
import System.Environment
import Text.Printf

main :: IO ()
main = do
    (a:_) <- getArgs
    case evalE a of
        Just (v) -> printf "%0.2f\n" v
        Nothing -> errorMessage