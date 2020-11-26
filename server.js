var express = require("express")
var app = express()
var PORT = process.env.PORT || 3000;
var bodyParser = require("body-parser")
//nasłuch na określonym porcie
let adm = false
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT)
})
var path = require("path");
const { table } = require("console");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    console.log("ścieżka do katalogu głównego aplikacji: " + __dirname)
    res.sendFile(path.join(__dirname + "/static/main.html"))

})
var tab = [
    { id: 1, login: "AAA", password: "PASS1", age: 10, uczen: "checked", plec: "m" },
    {
        login: 'bbb',
        password: 'PASS2',
        age: '15',
        uczen: 'checked',
        plec: 'm',
        id: 2
    },
    {
        login: 'ggg',
        password: 'PASS3',
        age: '12',
        uczen: 'checked',
        plec: 'k',
        id: 3
    },
    {
        login: 'ddd',
        password: 'PASS4',
        age: '16',
        uczen: 'checked',
        plec: 'k',
        id: 4
    }
]

const admin = { login: tab[0].login, password: tab[0].password }
var i = 4
let k = 0

app.get("/register", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/register.html"))
    console.log(__dirname)
})


app.post("/register", function (req, res) {
    k = 0
    for (var z = 0; z < i; z++) {
        console.log(tab[z].login)
        if (req.body.login != tab[z].login) {
            k += 1
        } else {
            k -= 1
        }
    }
    console.log(i)
    console.log(k)
    if (k == i) {
        tab[i] = req.body
        tab[i].id = i + 1
        res.send("witaj, " + req.body.login + " jestes zarejstrowany")
        console.log("good")
        i++
    } else {
        res.send("taki login juz istnieje")
        console.log("bylo")
    }

    for (var z = 0; z < i; z++) {
        console.log(tab[z])
    }
})
let log = false
app.get("/admin", function (req, res) {
    if (adm == false) {
        if (log == true) {
            res.sendFile(path.join(__dirname + "/static/admin_nL.html"))
        } else {
            res.sendFile(path.join(__dirname + "/static/admin_n.html"))
        }
    } else if (adm == true) {
        res.sendFile(path.join(__dirname + "/static/admin.html"))
    }
    console.log(__dirname)
})
app.get("/login", function (req, res) {
    res.sendFile(path.join(__dirname + "/static/login.html"))

    console.log(__dirname)
})
app.post("/login", function (req, res) {
    k = 0
    console.log(req.body.login)
    console.log(req.body.password)
    for (var z = 0; z < tab.length; z++) {
        console.log(tab[z].login)
        console.log(tab[z].password)
        if (req.body.login == tab[z].login && req.body.password == tab[z].password) {
            k += 1
        } else {
            k += 0
        }
    }

    console.log(k)
    if (k == 1) {
        if (req.body.login == admin.login && req.body.password == admin.password) {
            adm = true
            res.redirect("/admin")
        } else {
            res.send("witaj, " + req.body.login + " jestes zalogowany")
            log = true
        }

    } else {
        res.send("nieprawidlowy login lub haslo")
        console.log("zle")
    }


})

app.get("/show", function (req, res) {
    if (adm == false) {
        res.sendFile(path.join(__dirname + "/static/admin_n.html"))
    } else if (adm == true) {
        console.log(tab[0].uczen)
        let str = '<link rel="stylesheet" href="css/style.css">' +
            '<div id="adm">' +
            '<div class="box" id="sort"><a href="/sort">sort</a></div>' +
            '<div class="box" id="gender"><a href="/gender">gender</a></div>' +
            '<div class="box" id="show"><a href="/show">show</a></div>' +
            '</div>' +
            '<table style="width:100%">'
        for (let z = 0; z < i; z++) {
            str += '<tr>' +
                '<th>id: ' + tab[z].id + '</th>' +
                '<th>user: ' + tab[z].login + '-' + tab[z].password + '</th>' +
                '<th>uczen: ' + '<input type="checkbox" disabled ' + tab[z].uczen + '></input>' + '</th>' +
                '<th>wiek: ' + tab[z].age + '</th>' +
                '<th>plec: ' + tab[z].plec + '</th>' +
                '</tr>'
        }
        res.send(str)
    }
})
app.get("/gender", function (req, res) {
    if (adm == false) {
        res.sendFile(path.join(__dirname + "/static/admin_n.html"))
    } else if (adm == true) {
        let str = '<link rel="stylesheet" href="css/style.css">' +
            '<div id="adm">' +
            '<div class="box" id="sort"><a href="/sort">sort</a></div>' +
            '<div class="box" id="gender"><a href="/gender">gender</a></div>' +
            '<div class="box" id="show"><a href="/show">show</a></div>' +
            '</div>' +
            '<table style="width:100%">'
        for (let z = 0; z < tab.length; z++) {
            console.log(tab[z].plec)
            if (tab[z].plec == "k") {
                str += '<tr>' +
                    '<th>id: ' + tab[z].id + '</th>' +
                    '<th>plec: ' + tab[z].plec + '</th>' +
                    '</tr>'
            }
        }
        str += '<table style="width:100%">'
        for (let z = 0; z < tab.length; z++) {
            console.log(tab[z].plec)
            if (tab[z].plec == "m") {
                str += '<tr>' +
                    '<th>id: ' + tab[z].id + '</th>' +
                    '<th>plec: ' + tab[z].plec + '</th>' +
                    '</tr>'
            }
        }
        res.send(str)
    }
})
let val = 1
let ch1 = "checked"
let ch2
app.post("/sort", function (req, res) {

    console.log(req.body.mal)
    if (val == 1) {

        ch1 = "checked"
        ch2 = 0
        tab.sort(function (a, b) { return parseInt(b.age) - parseInt(a.age); });


    } else if (val == 0) {

        ch1 = 0
        ch2 = "checked"
        tab.sort(function (a, b) { return parseInt(a.age) - parseInt(b.age); });
    }
    console.log("ch1: " + ch1)
    console.log("ch2: " + ch2)
    res.redirect("/sort")

})
app.get("/sort", function (req, res) {
    if (adm == false) {
        res.sendFile(path.join(__dirname + "/static/admin_n.html"))
    } else if (adm == true) {
        console.log("ch1: " + ch1)
        console.log("ch2: " + ch2)
        if (ch1 == "checked") {
            val = 0
        } else if (ch2 == "checked") {
            val = 1
        }
        let str = '<link rel="stylesheet" href="css/style.css">' +
            '<div id="adm">' +
            '<div class="box" id="sort"><a href="/sort">sort</a></div>' +
            '<div class="box" id="gender"><a href="/gender">gender</a></div>' +
            '<div class="box" id="show"><a href="/show">show</a></div>' +
            '</div>' + '<form action="/sort" method="POST" onchange="this.submit()">' +
            '<input type="radio" id="ros" name="ros" value="1" ' + ch1 + ' >' + '<label for="ros">rosnaco</label>' +
            '<input type="radio" id="mal" name="mal" value="0" ' + ch2 + ' >' + '<label for="mal">malejaco</label>' +
            '</form>' +
            '<table style="width:100%">'
        for (let z = 0; z < i; z++) {
            str += '<tr>' +
                '<th>id: ' + tab[z].id + '</th>' +
                '<th>user: ' + tab[z].login + '-' + tab[z].password + '</th>' +
                '<th>wiek: ' + tab[z].age + '</th>' +
                '</tr>'
        }

        res.send(str)
    }

})
app.get("/logout", function (req, res) {
    adm = false
    log = false
    res.redirect("/")
})


app.use(express.static('static'))
