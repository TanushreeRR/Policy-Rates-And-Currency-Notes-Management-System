const express = require('express');
const mysql = require('mysql');
const { Matrix, solve } = require('ml-matrix');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql'
});

db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('MySQL Connected');
});

const app = express();

app.get('/', (req, res) => {
  console.log("Acessed home.html");
  res.sendFile(__dirname + '/home.html');
});
app.get('/policy.html', (req, res) => {
  console.log("Acessed policy.html");
  res.sendFile(__dirname + '/policy.html');
});
app.get('/currency.html', (req, res) => {
  console.log("Acessed currency.html");
  res.sendFile(__dirname + '/currency.html');
});

app.use(express.static(__dirname + '/allcss'));

app.get('/createrbipolicies', (req, res) => {
    const sql = 'CREATE TABLE POLICY_RATES_RBI2(POLICY_IDs_ INT, POLICY_NAMEs2_ VARCHAR(255), YEAR__ INT,QUARTER__ INT, VALUE__ FLOAT, PRIMARY KEY(POLICY_IDs_,YEAR__,QUARTER__))';
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('RBI POLICIES table created');
    });
  });

  app.get('/insertpolicies', (req, res) => {
    var sql = "INSERT INTO POLICY_RATES_RBI2 VALUES ?";
    var post = [
        [1,'RR', 2021,2,4],
        [1,'RR', 2021,3,4.1],
        [1,'RR', 2021,4,4.4],
        [1,'RR', 2022,1,4.9],
        [1,'RR', 2022,2,5.4],
        [1,'RR', 2022,3,5.9],
        [1,'RR', 2022,4,6.25],
        [1,'RR', 2023,1,6.5],
        [2,'RRR', 2021,2,3],
        [2,'RRR', 2021,3,3],
        [2,'RRR', 2021,4,3.3],
        [2,'RRR', 2022,1,3.3],
        [2,'RRR', 2022,2,3.35],
        [2,'RRR', 2022,3,3.35],
        [2,'RRR', 2022,4,3.35],
        [2,'RRR', 2023,1,3.35],
        [3,'CRR', 2021,2,3.6],
        [3,'CRR', 2021,3,3.6],
        [3,'CRR', 2021,4,3.9],
        [3,'CRR', 2022,1,3.9],
        [3,'CRR', 2022,2,4.1],
        [3,'CRR', 2022,3,4.1],
        [3,'CRR', 2022,4,4.5],
        [3,'CRR', 2023,1,4.5],
        [4,'SLR', 2021,2,19.5],
        [4,'SLR', 2021,3,19.25],
        [4,'SLR', 2021,4,19],
        [4,'SLR', 2022,1,18.75],
        [4,'SLR', 2022,2,18.5],
        [4,'SLR', 2022,3,18.25],
        [4,'SLR', 2022,4,18],
        [4,'SLR', 2023,1,18],
      
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
      res.send('Policies added');
    });
  });

  app.get('/createfactors', (req, res) => {
    const sql = 'CREATE TABLE FACTOR_RATES_TABLE(FACTOR_ID_ INT, FACTOR_NAME_ VARCHAR(255), RATE_ FLOAT,YEAR_ INT,QUARTER_ INT, PRIMARY KEY(FACTOR_ID_,YEAR_,QUARTER_))';
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('FACTORS table created');
    });
  }); 

  app.get('/insertfactors', (req, res) => {
    var sql = "INSERT INTO FACTOR_RATES_TABLE VALUES ?";
    var post = [
      [1,'Inflation', 2.1,2021,2],
      [1,'Inflation', 3.5,2021,3],
      [1,'Inflation', 4,2021,4],
      [1,'Inflation', 4.5,2022,1],
      [1,'Inflation', 5,2022,2],
      [1,'Inflation', 5.5,2022,3],
      [1,'Inflation', 5.8,2022,4],
      [1,'Inflation', 6.2,2023,1],
      [2,'Economic growth', 4.9,2021,2],
      [2,'Economic growth', 5.1,2021,3],
      [2,'Economic growth', 5.4,2021,4],
      [2,'Economic growth', 5.7,2022,1],
      [2,'Economic growth', 5.9,2022,2],
      [2,'Economic growth', 6.3,2022,3],
      [2,'Economic growth', 6.6,2022,4],
      [2,'Economic growth', 6.9,2023,1],
      [3,'Fiscal deficit', 4.5,2021,2],
      [3,'Fiscal deficit', 4.2,2021,3],
      [3,'Fiscal deficit', 4.7,2021,4],
      [3,'Fiscal deficit', 5.2,2022,1],
      [3,'Fiscal deficit', 5.5,2022,2],
      [3,'Fiscal deficit', 6,2022,3],
      [3,'Fiscal deficit', 6.3,2022,4],
      [3,'Fiscal deficit', 6.5,2023,1],
      [4,'Currency exchange rates', 69,2021,2],
      [4,'Currency exchange rates', 70,2021,3],
      [4,'Currency exchange rates', 71,2021,4],
      [4,'Currency exchange rates', 73,2022,1],
      [4,'Currency exchange rates', 75,2022,2],
      [4,'Currency exchange rates', 76,2022,3],
      [4,'Currency exchange rates', 77,2022,4],
      [4,'Currency exchange rates', 79,2023,1],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
      res.send('factors added');
    });
  });

  app.get('/createpolicyweights', (req, res) => {
    const sql = 'CREATE TABLE POLICY_WEIGHTS_RBI(POLICY_IDs_ INT, FACTOR_ID_ INT, WEIGHT FLOAT, FOREIGN KEY(POLICY_IDs_) REFERENCES POLICY_RATES_RBI2(POLICY_IDs_) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(FACTOR_ID_) REFERENCES FACTOR_RATES_TABLE(FACTOR_ID_) ON DELETE CASCADE ON UPDATE CASCADE)';
  
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('Policy weights table created');
    });
  });
  
  

  app.get('/intercepts', (req, res) => {
    const sql = 'CREATE TABLE INTERCEPTS(POLICY_IDs_ INT, INTERCEPT FLOAT, FOREIGN KEY(POLICY_IDs_) REFERENCES POLICY_RATES_RBI(POLICY_IDs_) ON DELETE CASCADE ON UPDATE CASCADE)';
  
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('Policy intercepts table created');
    });
  });


  app.get('/mlmodel1', (req, res) => {
    const x = [
      [2.1, 4.9, 4.5, 69], 
      [3.5,5.1,4.2,70], 
      [4,5.4,4.7,71],
      [4.5,5.7,5.2,73],
      [5,5.9,5.5,75],
      [5.5,6.3,6,76],
      [5.8,6.6,6.3,77],
      [6.2,6.9,6.5,79]
    ];
  const y=[4,4.1,4.4,4.9,5.4,5.9,6.25,6.5];
    const lambda = 0.1; // Regularization parameter

// Convert data to matrices
const X = new Matrix(x);
const Y = Matrix.columnVector(y);

// Add a column of ones for the intercept term
const ones = Matrix.ones(X.rows, 1);
const XWithIntercept = new Matrix(X.rows, X.columns + 1);
XWithIntercept.setColumn(0, ones);
XWithIntercept.setSubMatrix(X, 0, 1);

// Compute the Ridge Regression coefficients using the Normal Equation
const identity = Matrix.eye(XWithIntercept.columns, XWithIntercept.columns).mul(lambda);
const XTX = XWithIntercept.transpose().mmul(XWithIntercept);
const XTY = XWithIntercept.transpose().mmul(Y);
const coefficients = solve(XTX.add(identity), XTY);
//console.log(coefficients.get(0,0));

    var sql = "INSERT INTO POLICY_WEIGHTS_RBI VALUES ?";
    var post = [
      [1,1, coefficients.get(1,0).toFixed(5)],
      [1,2, coefficients.get(2,0).toFixed(5)],
      [1,3, coefficients.get(3,0).toFixed(5)],
      [1,4, coefficients.get(4,0).toFixed(5)],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
    })
    var sql2 = "INSERT INTO INTERCEPTS VALUES ?";
    var post2 = [
        [1, coefficients.get(0,0).toFixed(5)],
    ];
      const query2 = db.query(sql2, [post2], err => {
        if (err) {
          throw err;
        }
      res.send('weights added');
    });
  });

  

  app.get('/mlmodel2', (req, res) => {
    const x = [
      [2.1, 4.9, 4.5, 69], 
      [3.5,5.1,4.2,70], 
      [4,5.4,4.7,71],
      [4.5,5.7,5.2,73],
      [5,5.9,5.5,75],
      [5.5,6.3,6,76],
      [5.8,6.6,6.3,77],
      [6.2,6.9,6.5,79]
    ];
  const y=[3,3,3.3,3.3,3.35,3.35,3.35,3.35];
    const lambda = 0.1; // Regularization parameter

// Convert data to matrices
const X = new Matrix(x);
const Y = Matrix.columnVector(y);

// Add a column of ones for the intercept term
const ones = Matrix.ones(X.rows, 1);
const XWithIntercept = new Matrix(X.rows, X.columns + 1);
XWithIntercept.setColumn(0, ones);
XWithIntercept.setSubMatrix(X, 0, 1);

// Compute the Ridge Regression coefficients using the Normal Equation
const identity = Matrix.eye(XWithIntercept.columns, XWithIntercept.columns).mul(lambda);
const XTX = XWithIntercept.transpose().mmul(XWithIntercept);
const XTY = XWithIntercept.transpose().mmul(Y);
const coefficients = solve(XTX.add(identity), XTY);
//console.log(coefficients.get(0,0));

    var sql = "INSERT INTO POLICY_WEIGHTS_RBI VALUES ?";
    var post = [
      [2,1, coefficients.get(1,0).toFixed(5)],
      [2,2, coefficients.get(2,0).toFixed(5)],
      [2,3, coefficients.get(3,0).toFixed(5)],
      [2,4, coefficients.get(4,0).toFixed(5)],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
    })
    
  });

  app.get('/mlmodel3', (req, res) => {
    const x = [
      [2.1, 4.9, 4.5, 69], 
      [3.5,5.1,4.2,70], 
      [4,5.4,4.7,71],
      [4.5,5.7,5.2,73],
      [5,5.9,5.5,75],
      [5.5,6.3,6,76],
      [5.8,6.6,6.3,77],
      [6.2,6.9,6.5,79]
    ];
  const y=[3.6,3.6,3.9,3.9,4.1,4.1,4.5,4.5];
    const lambda = 0.1; // Regularization parameter

// Convert data to matrices
const X = new Matrix(x);
const Y = Matrix.columnVector(y);

// Add a column of ones for the intercept term
const ones = Matrix.ones(X.rows, 1);
const XWithIntercept = new Matrix(X.rows, X.columns + 1);
XWithIntercept.setColumn(0, ones);
XWithIntercept.setSubMatrix(X, 0, 1);

// Compute the Ridge Regression coefficients using the Normal Equation
const identity = Matrix.eye(XWithIntercept.columns, XWithIntercept.columns).mul(lambda);
const XTX = XWithIntercept.transpose().mmul(XWithIntercept);
const XTY = XWithIntercept.transpose().mmul(Y);
const coefficients = solve(XTX.add(identity), XTY);
console.log(coefficients.get(0,0));

    var sql = "INSERT INTO POLICY_WEIGHTS_RBI VALUES ?";
    var post = [
      [3,1, coefficients.get(1,0).toFixed(5)],
      [3,2, coefficients.get(2,0).toFixed(5)],
      [3,3, coefficients.get(3,0).toFixed(5)],
      [3,4, coefficients.get(4,0).toFixed(5)],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
    })
    
  });


  app.get('/mlmodel4', (req, res) => {
    const x = [
      [2.1, 4.9, 4.5, 69], 
      [3.5,5.1,4.2,70], 
      [4,5.4,4.7,71],
      [4.5,5.7,5.2,73],
      [5,5.9,5.5,75],
      [5.5,6.3,6,76],
      [5.8,6.6,6.3,77],
      [6.2,6.9,6.5,79]
    ];
  const y=[19.5,19.25,19,18.75,18.5,18.25,18,18];
    const lambda = 0.1; // Regularization parameter

// Convert data to matrices
const X = new Matrix(x);
const Y = Matrix.columnVector(y);

// Add a column of ones for the intercept term
const ones = Matrix.ones(X.rows, 1);
const XWithIntercept = new Matrix(X.rows, X.columns + 1);
XWithIntercept.setColumn(0, ones);
XWithIntercept.setSubMatrix(X, 0, 1);

// Compute the Ridge Regression coefficients using the Normal Equation
const identity = Matrix.eye(XWithIntercept.columns, XWithIntercept.columns).mul(lambda);
const XTX = XWithIntercept.transpose().mmul(XWithIntercept);
const XTY = XWithIntercept.transpose().mmul(Y);
const coefficients = solve(XTX.add(identity), XTY);
console.log(coefficients.get(0,0));

    var sql = "INSERT INTO POLICY_WEIGHTS_RBI VALUES ?";
    var post = [
      [4,1, coefficients.get(1,0).toFixed(5)],
      [4,2, coefficients.get(2,0).toFixed(5)],
      [4,3, coefficients.get(3,0).toFixed(5)],
      [4,4, coefficients.get(4,0).toFixed(5)],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
    })
    
  });



  app.get('/getweight2', (req, res) => {
    const sql = 'SELECT * FROM POLICY_WEIGHTS_RBI';
    const query = db.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results);
      
      
    });
  });

  

  app.get('/getweight', (req, res) => {
    const sql = 'DELETE FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=3';
    const query = db.query(sql, (err, results) => {
      if (err) {
        throw err;
      }
      //console.log(results);
      
      
    });
  });

  
app.get('/policy-rates/:year/:quarter', (req, res) => {
    const year = req.params.year;
    const quarter = req.params.quarter;
    const sql = `SELECT POLICY_NAME,VALUE FROM RBI_POLICY WHERE year = ${year} AND quarter = ${quarter}`;
    const query= db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log(results);
    });
  });

  app.get('/factors/:policy/:inflation/:growth/:deficit/:exchange', (req, res) => {
    const policy = req.params.policy;
    const inflation = req.params.inflation;
    const growth = req.params.growth;
    const deficit = req.params.deficit;
    const exchange = req.params.exchange;
    if(policy=='RR')
    {
      const c1='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=1 AND FACTOR_ID_=1';
      db.query(c1, (err, results1) => {
    if (err) throw err;
    console.log(results1);
    const c2='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=1 AND FACTOR_ID_=2';
    db.query(c2, (err, results2) => {
        if (err) throw err;
        console.log(results2);
        const c3='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=1 AND FACTOR_ID_=3';
        db.query(c3, (err, results3) => {
            if (err) throw err;
            console.log(results3);
            const c4='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=1 AND FACTOR_ID_=4';
            db.query(c4, (err, results4) => {
                if (err) throw err;
                console.log(results4);
                const c0=-0.05757;
                const result=c0+(results1[0].WEIGHT*inflation)+(results2[0].WEIGHT*growth)+(results3[0].WEIGHT*deficit)+(results4[0].WEIGHT*exchange);
                res.json(result);
                console.log(result);
            });
        });
    });
});
      
    }

    else if(policy=='RRR')
    {
      const c1='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=2 AND FACTOR_ID_=1';
      db.query(c1, (err, results1) => {
    if (err) throw err;
    console.log(results1);
    const c2='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=2 AND FACTOR_ID_=2';
    db.query(c2, (err, results2) => {
        if (err) throw err;
        console.log(results2);
        const c3='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=2 AND FACTOR_ID_=3';
        db.query(c3, (err, results3) => {
            if (err) throw err;
            console.log(results3);
            const c4='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=2 AND FACTOR_ID_=4';
            db.query(c4, (err, results4) => {
                if (err) throw err;
                console.log(results4);
                const c0=0.03278;
                const result=c0+(results1[0].WEIGHT*inflation)+(results2[0].WEIGHT*growth)+(results3[0].WEIGHT*deficit)+(results4[0].WEIGHT*exchange);
                res.json(result);
                console.log(result);
            });
        });
    });
});
      
      
    }
    else if(policy=='CRR')
    {
      const c1='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=3 AND FACTOR_ID_=1';
      db.query(c1, (err, results1) => {
    if (err) throw err;
    console.log(results1);
    const c2='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=3 AND FACTOR_ID_=2';
    db.query(c2, (err, results2) => {
        if (err) throw err;
        console.log(results2);
        const c3='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=3 AND FACTOR_ID_=3';
        db.query(c3, (err, results3) => {
            if (err) throw err;
            console.log(results3);
            const c4='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=3 AND FACTOR_ID_=4';
            db.query(c4, (err, results4) => {
                if (err) throw err;
                console.log(results4);
                const c0=0.00673;
                const result=c0+(results1[0].WEIGHT*inflation)+(results2[0].WEIGHT*growth)+(results3[0].WEIGHT*deficit)+(results4[0].WEIGHT*exchange);
                res.json(result);
                console.log(result);
            });
        });
    });
});
      
      
    }
    else if(policy=='SLR')
    {
      const c1='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=4 AND FACTOR_ID_=1';
      db.query(c1, (err, results1) => {
    if (err) throw err;
    console.log(results1);
    const c2='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=4 AND FACTOR_ID_=2';
    db.query(c2, (err, results2) => {
        if (err) throw err;
        console.log(results2);
        const c3='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=4 AND FACTOR_ID_=3';
        db.query(c3, (err, results3) => {
            if (err) throw err;
            console.log(results3);
            const c4='SELECT WEIGHT FROM POLICY_WEIGHTS_RBI WHERE POLICY_IDs_=4 AND FACTOR_ID_=4';
            db.query(c4, (err, results4) => {
                if (err) throw err;
                console.log(results4);
                const c0=0.13962;
                const result=c0+(results1[0].WEIGHT*inflation)+(results2[0].WEIGHT*growth)+(results3[0].WEIGHT*deficit)+(results4[0].WEIGHT*exchange);
                res.json(result);
                console.log(result);
            });
        });
    });
});
      
      
    }
  });

  /*app.get('/createnotes', (req, res) => {
    const sql = 'CREATE TABLE CURRENCY_NOTES_RBI(NOTES_ID_ INT, YEAR_ INT,DENOMINATION_ INT, NO_OF_NOTES_ INT,PRIMARY KEY(NOTES_ID_))';
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('NOTES table created');
    });
  });*/

  app.get('/createnote', (req, res) => {
    const sql = 'CREATE TABLE RBI_CURRENCY(NOTES_ID_ INT, DENOMINATION_ INT,YEAR_ INT, NO_OF_NOTES INT,PRIMARY KEY(NOTES_ID_,YEAR_))';
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('NOTES table created');
    });
  });

  app.get('/insertnotes', (req, res) => {
    var sql = "INSERT INTO RBI_CURRENCY VALUES ?";
    var post = [
      [1,10,2018,90000],
      [1,10,2019,90500],
      [1,10,2020,90700],
      [1,10,2021,100000],
      [1,10,2022,102500],
      [2,20,2018,75000],
      [2,20,2019,80000],
      [2,20,2020,85000],
      [2,20,2021,87000],
      [2,20,2022,89000],
      [3,50,2018,70000],
      [3,50,2019,71000],
      [3,50,2020,71500],
      [3,50,2021,72000],
      [3,50,2022,73000],
      [4,100,2018,65000],
      [4,100,2019,66000],
      [4,100,2020,66500],
      [4,100,2021,67000],
      [4,100,2022,6800],
      [5,500,2018,50000],
      [5,500,2019,50500],
      [5,500,2020,56500],
      [5,500,2021,57000],
      [5,500,2022,58000],
      
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
      res.send('Notes added');
    });
  });

  app.get('/createnoteweights', (req, res) => {
    const sql = 'CREATE TABLE NOTE_WEIGHTS_(NOTES_ID_ INT, FACTOR_ID_ INT, WEIGHT_ FLOAT, FOREIGN KEY(NOTES_ID_) REFERENCES RBI_CURRENCY(NOTES_ID_) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY(FACTOR_ID_) REFERENCES FACTOR_RATES_TABLE(FACTOR_ID_) ON DELETE CASCADE ON UPDATE CASCADE)';
  
    db.query(sql, err => {
      if (err) {
        throw err;
      }
      res.send('Note weights table created');
    });
  });

  app.get('/insertnweights', (req, res) => {
    var sql = "INSERT INTO NOTE_WEIGHTS_ VALUES ?";
    var post = [
      [1,1,0.1],
      [1,2,0.08],
      [1,3,-0.03],
      [1,4,0.06],
      [2,1,0.2],
      [2,2,0.12],
      [2,3,-0.04],
      [2,4,0.08],
      [3,1,0.3],
      [3,2,0.15],
      [3,3,-0.05],
      [3,4,0.1],
      [4,1,0.4],
      [4,2,0.2],
      [4,3,-0.06],
      [4,4,0.12],
      [5,1,0.5],
      [5,2,0.22],
      [5,3,-0.07],
      [5,4,0.13],
    ];
    const query = db.query(sql, [post], err => {
      if (err) {
        throw err;
      }
      res.send('Note weights added');
    });
  });

  /*app.get('/note-number/:year/:denomination', (req, res) => {
    const year = req.params.year;
    const denomination=req.params.denomination;
    const sql = `SELECT NO_OF_NOTES FROM RBI_CURRENCY WHERE YEAR_=${year} AND DENOMINATION_ = ${denomination}`;
    
    const query= db.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
      console.log(results);
    });
  });*/
  app.get('/note-number/:year/:denomination', (req, res) => {
    const year = req.params.year;
    const denomination = req.params.denomination;
  
    // Fetch number of notes based on year and denomination
    const sql = `SELECT NO_OF_NOTES FROM RBI_CURRENCY WHERE YEAR_=${year} AND DENOMINATION_=${denomination}`;
    db.query(sql, (err, results) => {
      if (err) throw err;
  
      // Prepare data for the first graph (number of notes of each denomination in the user-entered year)
      const sqlDenomination = `SELECT DENOMINATION_, NO_OF_NOTES AS TOTAL_NOTES FROM RBI_CURRENCY WHERE YEAR_=${year} GROUP BY DENOMINATION_`;
      db.query(sqlDenomination, (err, denominationResults) => {
        if (err) throw err;
  
        // Prepare data for the second graph (number of notes printed in each year for the user-entered denomination)
        const sqlYear = `SELECT YEAR_, NO_OF_NOTES AS TOTAL_NOTES FROM RBI_CURRENCY WHERE DENOMINATION_=${denomination} GROUP BY YEAR_`;
        db.query(sqlYear, (err, yearResults) => {
          if (err) throw err;
  
          // Send the response with the results and data for both graphs
          res.json({
            noteNumber: results,
            denominationGraphData: denominationResults,
            yearGraphData: yearResults
          });
        });
      });
    });
  });
  
  

app.listen('3010', () => {
    console.log('Server started on port 3010');
  });
  app.get('*', (req, res) => {
    console.log("Accessed home page");
    res.sendFile(__dirname + '/home.html');
  });