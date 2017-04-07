library(mongolite)
args=(commandArgs(TRUE))

m <- mongo("users", url = "mongodb://127.0.0.1:27017/mydb")
str <- c(args)
m$insert(str)
