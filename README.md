# rxcute
NodeJs execute rscript library

### Main Idea

Presently, all developers have found inconvenient programming connect to multiple data sources 
such as Text file, CSV, Excel, Oracle, MSSQL, MySQL, Postgres, MongoDB, Redis, Elasticsearch and etc. 
I’ve experienced programming in C# and NodeJS which available connect any data sources by driver 
but need to learn it on different ways and might have some configuration problem. Oh! so many things to do.
My idea is that needs to use only one programming language to solve these problems. 
I want simplest way and native support each data sources too. R language is the best choice that I knew. 
It is programming language and software environment for statistical analysis, graphics representation and reporting. 
R is most popular for data scientist and statistics. This solution can separate task by suitable skill of people too. 
It help to solve 2 main problems of technical and people.

### Road Map

- 0.0.1 => simple execute R script
- 0.1.0 => multiple scripts execution next 1 month
- 1.0.0 => return result to ORM next 2 month
- 1.1.0 => meta structure rule for each device

### Prerequisites
- install R
- https://www.r-project.org/

### How to use
```javascript
const R = require('rxcute');
var r = new R();

r.exec(rScript, parameter, options, callback);
r.execSync(rScript, parameter, options);

```
- **rScript** > R Script file to execute.
- **parameter** > parameter is string which can be any formats such as JSON, XML, array, number, string, etc 
but need to convert to correctly format in R script.
- **options** > optional of R console such as "max.print=100"
- **callback** > callback function for asynchronous execution.


### Example
```javascript
//init
const R = require('rxcute');
var r = new R();

r.exec('./example/hello.R',null,function(result){
	  console.log(result);
})

```

```javascript
//get data from MongoDB and limit result only 100 records

r.exec('./example/getData.R',null,'max.print=100',function(result){
	  console.log(result);
})

var result = r.execSync('./resources/getData.R',null,'max.print=100');
	console.log('result => ', result.toString())

```


```javascript
// insert data to MongoDB

r.exec('./example/insertData.R',{firstName:"John", lastName:"Doe"},function(result){
	  console.log(result);
})

```
#### result
- status => 200 : Successfully
         => 500 : Error
- output => result as string
* all of result need to convert to be format as you need to use.
* for example of mongodb you need to install mongolite and jsonlite
