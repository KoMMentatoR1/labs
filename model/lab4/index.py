import math
import matplotlib.pyplot as plt

N = 100
x = []
def defaultFun(x):
    return -(x**2 / 100) + 2*x / 5 - 3

defaultValues = []

def add_value_if_positive(value):
    if value >= 0:
        return value
    else:
        return 0

for i in range(N + 1):
    x.append(i)

for i in range(N + 1):
    value = defaultFun(i)
    defaultValues.append(add_value_if_positive(value))


def read_last_line(file_name):
    with open(file_name, 'r') as file:
        lines = file.readlines()
        last_line = lines[-1]
        return last_line
    
def split_str(targetStr):
    return [float(item) for item in targetStr.split()]

def count_result(sigma, file_name):
    hx = 1.0
    ht = 0.1
    T = 100.0
    t = 0.0

    l1 = 0.5
    l2 = -0.5

    u = 0.7
    mu = 1

    # Расчетные массивы
    zn = [0.0] * (N + 1)
    q = [0.0] * (N + 1)
    a = [0.0] * (N + 1)
    b = [0.0] * (N + 1)
    c = [0.0] * (N + 1)
    F = [0.0] * (N + 1)
    alf_array = [0.0] * (N + 1)
    bet_array = [0.0] * (N + 1)

    q = defaultValues[:]

    a[0] = 0.0
    b[0] = (-u / (2 * hx) + mu / (hx * hx)) * sigma
    c[0] = 1.0 / (2 * ht) + b[0] + mu * l1 * sigma / hx

    for i in range(1, N):
        a[i] = (u / (2 * hx) + mu / (hx * hx)) * sigma
        b[i] = (-u / (2 * hx) + mu / (hx * hx)) * sigma
        c[i] = 1 / ht + a[i] + b[i]

    for i in range(N):
        zn[i] = c[i] - alf_array[i] * a[i]
        alf_array[i + 1] = b[i] / zn[i]

    with open(file_name, "w") as fout:
        while t < T + ht / 2:
            l3 = 0.5 * math.sin(math.pi * t / 50)

            F[0] = q[0] * (1 / (2 * ht) - (-u / (2 * hx) + mu / (hx * hx) + mu * l1 / hx) * (1 - sigma)) + q[1] * (
                        -u / (2 * hx) + mu / (hx * hx)) * (1 - sigma) - mu * l2 / hx

            for i in range(1, N):
                F[i] = q[i] * (1 / ht - 2 * (1 - sigma) * mu / (hx * hx)) + q[i + 1] * (-u / (2 * hx) + mu / (hx * hx)) * (
                            1 - sigma) + q[i - 1] * (u / (2 * hx) + mu / (hx * hx)) * (1 - sigma)

            for i in range(N):
                bet_array[i + 1] = (F[i] + a[i] * bet_array[i]) / zn[i]

            q[N] = l3
            for i in range(N - 1, -1, -1):
                q[i] = alf_array[i + 1] * q[i + 1] + bet_array[i + 1]

            t += ht

            fout.write(" ".join(str(q_val) for q_val in q[:-1]) + "\n")

count_result(0, 'result1.txt')
yavn = split_str(read_last_line('result1.txt'))
count_result(0.5, 'result2.txt')
toch = split_str(read_last_line('result2.txt'))
count_result(1, 'result3.txt')
neyavn = split_str(read_last_line('result3.txt'))

fig, axs = plt.subplots(2, 2, figsize=(10, 8))

axs[0, 0].plot(x[:100], defaultValues[:100], label='Исходный график')
axs[0, 0].plot(x[:100], yavn, label='Явное')
axs[0, 0].set_xlabel('x')
axs[0, 0].set_ylabel('y')
axs[0, 0].grid(True)
axs[0, 0].legend()

axs[0, 1].plot(x[:100], defaultValues[:100], label='Исходный график')
axs[0, 1].plot(x[:100], toch, label='Точное')
axs[0, 1].set_xlabel('x')
axs[0, 1].set_ylabel('y')
axs[0, 1].grid(True)
axs[0, 1].legend()

axs[1, 0].plot(x[:100], defaultValues[:100], label='Исходный график')
axs[1, 0].plot(x[:100], neyavn, label='Неявное')
axs[1, 0].set_xlabel('x')
axs[1, 0].set_ylabel('y')
axs[1, 0].grid(True)
axs[1, 0].legend()

plt.show()