/*EUKLIDES*/
function wiersz(a, b, q, s, sprime, t, tprime){
    return {a: a, b: b, q: q, s: s, sprime: sprime, t: t, tprime: tprime};
}

function algorytm(a, b){
    a = Math.abs(a);
    b = Math.abs(b);
    let q = Math.floor(a / b);
    let s = 1;
    let sprime = 0;
    let t = 0;
    let tprime = 1;

    const wiersze = [wiersz(a, b, q, s, sprime, t, tprime)];
    let n = 1;
    while(a > 0 && b > 0){
        a = b;
        b = wiersze[n - 1].a - wiersze[n - 1].b * wiersze[n - 1].q;

        q = sprime = tprime = null;
        s = wiersze[n - 1].sprime;
        t = wiersze[n - 1].tprime;
        if(a > 0 && b > 0){
            q = Math.floor(a / b);
            sprime = wiersze[n - 1].s - wiersze[n - 1].sprime * wiersze[n - 1].q;
            tprime = wiersze[n - 1].t - wiersze[n - 1].tprime * wiersze[n - 1].q;
        }

        wiersze.push(wiersz(a, b, q, s, sprime, t, tprime));

        ++n;
    }

    return wiersze;
}

const wnawias = (x) => {
    if(x < 0)
        return "(" + x + ")";
    return x;
}

function EUKLIDoblicz(){
    const a = document.getElementById('EUKLIDinputA').value;
    const b = Math.abs(document.getElementById('EUKLIDinputB').value);

    const data = algorytm(a, b);

    const table = document.getElementById('euklid').getElementsByTagName('tbody')[0];
    while(table.firstChild){
        table.removeChild(table.lastChild);
    }

    if(document.getElementById("EUKLIDcheckbox").checked){
        let nowyWiersz = table.insertRow();
        let nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].a;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].b;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].q;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].s;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].sprime;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].t;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[0].tprime;

        for(let i = 1; i < data.length; ++i){
            nowyWiersz = table.insertRow();
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].a;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = wnawias(data[i - 1].a) + "-" + wnawias(data[i - 1].b) + "&#215;" + wnawias(data[i-1].q) + "=" + wnawias(data[i].b);
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = wnawias(data[i - 1].a) + " DIV " + wnawias(data[i - 1].b) + "=" + wnawias(data[i].q);
            if(data[i].q == null)
                nowaKomorka.innerHTML = "";
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].s;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = wnawias(data[i-1].s) + "-" + wnawias(data[i - 1].sprime) + "&#215;" + wnawias(data[i - 1].q) + "=" + wnawias(data[i].sprime);
            if(data[i].sprime == null)
                nowaKomorka.innerHTML = "";
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].t;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = wnawias(data[i-1].t) + "-" + wnawias(data[i - 1].tprime) + "&#215;" + wnawias(data[i - 1].q) + "=" + wnawias(data[i].tprime);
            if(data[i].tprime == null)
                nowaKomorka.innerHTML = "";
        }
    } else {
        for(let i = 0; i < data.length; ++i){
            const nowyWiersz = table.insertRow();
            let nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].a;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].b;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].q;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].s;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].sprime;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].t;
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = data[i].tprime;
        }
    }

    const wynikDiv = document.getElementById("euklidwynik");
    wynikDiv.innerHTML = "<p><b>NWD(" + a + ", " + b + ") = " + data[data.length-1].a + "</b></p>";
    let m = data[data.length-1].s;
    let n = data[data.length-1].t;

    m += Math.ceil(Math.abs(m) / b) * b;
    n += Math.ceil(Math.abs(n) / b) * b;

    wynikDiv.innerHTML += "<p><b>m = " + m + "</b></p>";
    if(data[data.length-1].t != null)
        wynikDiv.innerHTML += "<p><b>n = " + data[data.length-1].t + "</b></p>";
}

/*MNOZENIE*/
function mnozenie(a, b){
    const sign = Math.sign(b);
    const wiersze = [{a: a * sign, b: b, parity: (b % 2) === 0}];

    while(Math.abs(b) > 0.000001){
        a = a * 2;
        b = Math.floor(Math.abs(b) / 2);

        wiersze.push({a: a * sign, b: b, parity: (b % 2) === 0})
    }

    wiersze[wiersze.length - 1].a = null;

    return wiersze;
}

function MULoblicz(){
    const a = Math.abs(document.getElementById('MULinputA').value);
    const b = Math.abs(document.getElementById('MULinputB').value);
    const table = document.getElementById('multable').getElementsByTagName('tbody')[0];
    while(table.firstChild){
        table.removeChild(table.lastChild);
    }

    const liczby = [];
    const data = mnozenie(+a, +b);
    let suma = 0;

    for(let i = 0; i < data.length; ++i){
        const nowyWiersz = table.insertRow();
        let nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[i].a;
        nowaKomorka = nowyWiersz.insertCell();
        nowaKomorka.innerHTML = data[i].b;

        if(!data[i].parity){
            liczby.push(wnawias(data[i].a));
            suma += data[i].a;
            nowyWiersz.style.backgroundColor = "#806565";
        }

        if(i > 0){
            nowaKomorka = nowyWiersz.insertCell();
            nowaKomorka.innerHTML = "A:=2&#215;"+data[i - 1].a + ", B:=" + data[i - 1].b + " DIV 2";
        }
    }

    const wynikDiv = document.getElementById("mulwynik");
    wynikDiv.innerHTML = "<p>Wynik: " + liczby.join("+") + " = <b>" + suma + "</b></p>";
}