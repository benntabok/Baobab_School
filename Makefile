oot Makefile
CC = gcc
CFLAGS = -Wall -Wextra -I./server
SRC = server/main.c server/request_handler.c server/response_generator.c server/utils.c
OBJ = $(SRC:.c=.o)
	TARGET = baobab_server

all: $(TARGET)

$(TARGET): $(OBJ)
		$(CC) $(OBJ) -o $(TARGET)

clean:
		rm -f server/*.o $(TARGET)
