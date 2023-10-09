const tochnoe = document.getElementById('tochnoe')

const fun = (x) => {
    const pi = Math.PI;
    const sum = x + pi / 4;
    return Math.tan(sum);
}

const n = 73;
const h = 0.01;
const y0 = 1;

const x = []

for(let i = 0; i < n; i++) {
    x.push(i * h)
}

const results = {
    tochnoe: [],
    explicit: [],
    notExplicit: [],
    weight: []
}

for(const i of x) {
    results.tochnoe.push(fun(i))
}

const funExplicit = (y, h) => {
    const funy = y**2 + 1 
    return y + h * funy
}

results.explicit.push(1)

for(let i = 1; i < n; i++) {
    results.explicit.push(funExplicit(results.explicit[i-1], h))
}

function solveQuadraticEquation(a, b, c) {
    const discriminant = b * b - 4 * a * c;

    if (discriminant > 0) {
      const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
      const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
      return root1 < root2 ? root1 : root2;
    } else {
      const root = -b / (2 * a);
      return root;
    }
}

const funNotExplicit = (y, h) => {
    const a = -h;
    const b = 1;
    const c = - (y + h)
    return solveQuadraticEquation(a, b, c)
}

results.notExplicit.push(1)

for(let i = 1; i < n; i++) {
    results.notExplicit.push(funNotExplicit(results.notExplicit[i-1], h))
}

const funWeight= (y, h) => {
    return ((2-h) / (2+h)) * y
}

results.weight.push(1)

for(let i = 1; i < n; i++) {
    results.weight.push(funExplicit(results.explicit[i-1], h))
}



new Chart(tochnoe, {
    data: {
        datasets: [{
            type: 'line',
            label: 'Точное решение',
            data: results.tochnoe,
            borderColor: 'red'
        },
        {
            type: 'line',
            label: 'Явное',
            data: results.explicit,
            borderColor: 'blue'
        },
        {
            type: 'line',
            label: 'Неявное',
            data: results.notExplicit,
            borderColor: 'green'
        },
        {
            type: 'line',
            label: 'С весами',
            data: results.weight,
            borderColor: 'dark'
        }],
        labels: x
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const  pogresh = (resh) => {
    const sumAnalit = results.tochnoe.reduce((a,b) => a + b)
    let sumDelta = 0
    for (let i = 0; i < resh.length; i++) {
        sumDelta += Math.abs(results.tochnoe[i] -  resh[i]) 
    }

    return  Math.round(((sumDelta / sumAnalit) * 100) * 100) / 100
  }

  console.log("Погрешность явного: " + pogresh(results.explicit) + '%' );
  console.log("Погрешность неявного: " + pogresh(results.notExplicit) + '%' );
  console.log("Погрешность c весами: " + pogresh(results.weight) + '%' );