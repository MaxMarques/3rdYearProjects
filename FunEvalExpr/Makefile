##
## EPITECH PROJECT, 2021
## Makefile
## File description:
## Makefile
##

NAME =	funEvalExpr

SRC =	src/Lib.hs app/Main.hs

all:	$(NAME)

$(NAME):	$(SRC)
	stack build --copy-bins --local-bin-path .

clean:
	stack clean
	rm .stack-work imageCompressor.cabal -rf

fclean:	clean
	$(RM) $(NAME)
	$(RM) *~
	$(RM) *.o

re:	fclean all

.PHONY:	all clean fclean re