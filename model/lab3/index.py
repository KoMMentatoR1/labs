import matplotlib.pyplot as plt
import numpy as np

def defaultFun(x):
    return -(x**2 / 100) + 8*x / 5 - 63

n = 100
m = 100
t = m / 1000
h = 1
k = 1
x = []

defaultValues = []

def add_value_if_positive(value):
    if value >= 0:
        return value
    else:
        return 0

for i in range(n):
    x.append(i)

for i in range(n):
    value = defaultFun(i)
    defaultValues.append(add_value_if_positive(value))


def explicit(c, c_prev, c_next):
    return c + k * t * (c_prev - 2 * c + c_next) / h * h 

explicit_values = [[*defaultValues]]

for i in range(1, n):
    explicit_values.append([])
    for j in range(m):
        result = explicit(
            explicit_values[i - 1][j],
            explicit_values[i - 1][j  - 1] if j - 1 >= 0 else 0,
            explicit_values[i - 1][j  + 1] if j + 1 < len(explicit_values[i - 1]) else 0,
        )
        explicit_values[i].append(result)

explicit_values = explicit_values[-1]


def not_explicit(N, t_end, L, lamda, ro, c, Tl, Tr):
    h = L / (N - 1)
    tau = t_end / 100

    T = [*defaultValues]
    alfa = np.zeros(N, dtype=float)
    beta = np.zeros(N, dtype=float)

    time = 0
    while time < t_end:
        time += tau

        alfa[0] = 0.0
        beta[0] = Tl

        for i in range(1, N - 1):
            ai = lamda / (h ** 2)
            bi = 2.0 * lamda / (h ** 2) + ro * c / tau
            ci = lamda / (h ** 2)
            fi = -ro * c * T[i] / tau

            alfa[i] = ai / (bi - ci * alfa[i - 1])
            beta[i] = (ci * beta[i - 1] - fi) / (bi - ci * alfa[i - 1])

        T[N - 1] = Tr

        for i in range(N - 2, -1, -1):
            T[i] = alfa[i] * T[i + 1] + beta[i]

    return T

fig, axs = plt.subplots(2, 2, figsize=(10, 8))

axs[0, 0].plot(x, defaultValues, label='Исходный график')
axs[0, 0].plot(x, explicit_values, label='Явная схема')
axs[0, 0].set_xlabel('x')
axs[0, 0].set_ylabel('y')
axs[0, 0].grid(True)
axs[0, 0].legend()

axs[0, 1].plot(x, defaultValues, label='Исходный график')
axs[0, 1].plot(x, not_explicit(n, 100, 100, k, 1, 1, 0, 0), label='Неявная')
axs[0, 1].set_xlabel('x')
axs[0, 1].set_ylabel('y')
axs[0, 1].grid(True)
axs[0, 1].legend()

plt.show()