import matplotlib.pyplot as plt

def defaultFun(x):
    return -(x**2 / 100) + 8*x / 5 - 63

n = 100
m = 100
v = -0.4
t = 1
h = 1
alpha = v * t / h
x = []

defaultValues = []

def add_value_if_positive(value):
    if value >= 0:
        return value
    else:
        return None

for i in range(n):
    x.append(i)

for i in range(n):
    value = defaultFun(i)
    defaultValues.append(add_value_if_positive(value))

def right_corner(c, c_next, alpha):

    if c == None: 
        c = 0

    if c_next == None: 
        c_next = 0

    return c - alpha * (c_next - c)

right_corner_values = [[*defaultValues]]

for i in range(1, n):
    right_corner_values.append([])
    for k in range(m):
        result = right_corner(
            right_corner_values[i - 1][k],
            right_corner_values[i - 1][k + 1] if k + 1 < len(right_corner_values[i - 1]) else None,
            alpha
        )
        right_corner_values[i].append(result)

right_corner_values = right_corner_values[-1]
right_corner_values = [value if value >= 0.001 else None for value in right_corner_values]

def central_difference(c, c_next, c_prev, alpha):

    if c == None: 
        c = 0

    if c_next == None: 
        c_next = 0

    if c_prev == None: 
        c_prev = 0

    return c - alpha * ((c_next - c_prev) / 4)

central_difference_values = [[*defaultValues]]

for i in range(1, n):
    central_difference_values.append([])
    for k in range(m):
        result = round(central_difference(
            central_difference_values[i - 1][k],
            central_difference_values[i - 1][k + 1] if k + 1 < len(central_difference_values[i - 1]) else 0,
            central_difference_values[i - 1][k - 1] if k - 1 >= 0 else 0,
            alpha
        ), 5)
        central_difference_values[i].append(result if result > 0 else 0)

central_difference_values = central_difference_values[-1]

def kabare(c, c_next, cc_next, alpha):

    if c == None: 
        c = 0

    if c_next == None: 
        c_next = 0

    if cc_next == None: 
        cc_next = 0


    return c - c_next + cc_next - 2 * alpha * (c_next - c)

kabare_values = [[*defaultValues]]

for i in range(1, n):
    kabare_values.append([])
    for k in range(m):
        if not (i == 1):
            if len(kabare_values[i - 2]) > k + 1:
                cc_next = kabare_values[i - 2][k + 1]
            elif len(kabare_values[i - 1]) > k + 1:
                cc_next = kabare_values[i - 1][k + 1]
            else:
                cc_next = 0
        else:
            cc_next = kabare_values[i - 1][k + 1] if len(kabare_values[i - 1]) > k + 1 else 0

        result = kabare(
            kabare_values[i - 1][k],
            kabare_values[i - 1][k + 1] if k + 1 < len(kabare_values[i - 1]) else 0,
            cc_next, 
            alpha,
        )
        kabare_values[i].append(result)

kabare_values = kabare_values[-1]

lin_comb_values = [[*defaultValues]]

def lin_comb(c, c_next, cc_prev, alpha, c_prev):

    if c == None: 
        c = 0

    if c_next == None: 
        c_next = 0

    if cc_prev == None: 
        cc_prev = 0
        
    if c_prev == None: 
        c_prev = 0
    

    return c - (c_prev - cc_prev) / 2 - alpha * (c_next + 4 * c - 5 * c_prev) / 4

for i in range(1, n):
    lin_comb_values.append([])
    for k in range(m):
        if not (i == 1):
            if 0 > k - 1:
                cc_prev = lin_comb_values[i - 2][k - 1]
            else:
                cc_prev = 0
        else:
            cc_prev = lin_comb_values[i - 1][k - 1] if k - 1 > 0 else 0

        result = lin_comb(
            lin_comb_values[i - 1][k],
            lin_comb_values[i - 1][k + 1] if k + 1 < len(lin_comb_values[i - 1]) else 0,
            cc_prev, 
            alpha,
            lin_comb_values[i - 1][k - 1] if k - 1 > 0 else 0,
        )
        lin_comb_values[i].append(result)

lin_comb_values = lin_comb_values[-1]        
    
fig, axs = plt.subplots(2, 2, figsize=(10, 8))

axs[0, 0].plot(x, defaultValues, label='Исходный график')
axs[0, 0].plot(x, right_corner_values, label='Правый угол')
axs[0, 0].set_xlabel('x')
axs[0, 0].set_ylabel('y')
axs[0, 0].grid(True)
axs[0, 0].legend()

axs[0, 1].plot(x, defaultValues, label='Исходный график')
axs[0, 1].plot(x, central_difference_values, label='Центральная разностная схема')
axs[0, 1].set_xlabel('x')
axs[0, 1].set_ylabel('y')
axs[0, 1].grid(True)
axs[0, 1].legend()

axs[1, 0].plot(x, defaultValues, label='Исходный график')
axs[1, 0].plot(x, kabare_values, label='Кабаре')
axs[1, 0].set_xlabel('x')
axs[1, 0].set_ylabel('y')
axs[1, 0].grid(True)
axs[1, 0].legend()

axs[1, 1].plot(x, defaultValues, label='Исходный график')
axs[1, 1].plot(x, lin_comb_values, label='Линейная комбинация')
axs[1, 1].set_xlabel('x')
axs[1, 1].set_ylabel('y')
axs[1, 1].grid(True)
axs[1, 1].legend()


plt.show()