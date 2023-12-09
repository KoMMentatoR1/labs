import numpy as np
from openpyxl import Workbook

# Размеры расчетной сетки
Nx = 100
Ny = 100
N = Nx * Ny

# Шаг по пространственным координатам
hx = 1
hy = 1
ht = 0.1

# Временный интервал 
lt = 10

# погрешность вычисления сеточных уравнений
eps = 1e-3

# Коэффициенты, стоящие в граничных условиях
alphax = 0
alphay = 0
betax = 0
betay = 0

# Вес схемы
sigma = 0.5

# Одномерный вещественный массив для описания поля концентрации 
C = np.zeros(N)

# одномерные вещественные массивы для поля коэффициента турбулентного обмена
mu = np.full(N, 2)

# одномерные вещественные массивы для функции, описывающей интенсивность и распределение источников
f = np.zeros(N)

# одномерные вещественные массивы для компонентов вектора скорости
u = np.full(N, 3)
v = np.full(N, 4)

# одномерные вещественные массивы для функции, описывающей заполненность ячеек
O = np.zeros(N)

# одномерные вещественные массивы для коэффициентов сеточных уравнений на текущем временном слое
A = np.zeros(N)
B1 = np.zeros(N)
B2 = np.zeros(N)
B3 = np.zeros(N)
B4 = np.zeros(N)

# одномерные вещественные массивы для коэффициентов сеточных уравнений на предыдущем временном слое 
B5 = np.zeros(N)
B6 = np.zeros(N)
B7 = np.zeros(N)
B8 = np.zeros(N)
B9 = np.zeros(N)

# одномерный вещественный массив для правых частей сеточных уравнений
F = np.zeros(N)

t = 0

m0, m1, m2, m3, m24 = 0, 0, 0, 0, 0 
q1, q2, q3, q4, q0 = 0, 0, 0, 0, 0 

matrixResultInTimeRange = []

def calculate():
    global t
    for i in range(1, Nx - 2):
        for j in range(1, Ny - 2):
            m0 = i + j * Nx;
            O[m0] = 1;
    
    # Точечный источник
    # i = Nx / 4;
    # j = Ny / 4;
    # m0 = int(i + j * Nx);
    # C[m0] = 1;

    # Задание линейного источника
    for k in range(3):
        for l in range(3):
            i = 10 + l;
            j = 10 + k;
            m0 = i + j * Nx;
            C[m0] = 0.1;

    while True:

        for i in range(1, Nx - 1):
            for j in range(1, Ny - 1):

                # if i > 40 and j > 70 and i < 50 and j < 80:
                #     continue
                
                m0 = i + j * Nx
        
                # Значения номеров элементов, стоящих в окрестности центра шаблона
                m1 = m0 + 1
                m2 = m0 - 1
                m3 = m0 + Nx
                m4 = m0 - Nx
                m24 = m0 - Nx - 1
        
                # Расчет коэффициентов, характеризующих заполненности контрольных областей
                q1 = (O[m0] + O[m4]) / 2
                q2 = (O[m2] + O[m24]) / 2
                q3 = (O[m0] + O[m2]) / 2
                q4 = (O[m4] + O[m24]) / 2
                q0 = (q1 + q2) / 2

                # Расчет коэффициентов сеточных уравнений для узлов, стоящих в окрестности центра шаблона без учета веса схемы
                B1[m0] = (-(u[m1] + u[m0]) / (4 * hx) + (mu[m1] + mu[m0]) / (2 * hx * hx)) * q1
                B2[m0] = ((u[m2] + u[m0]) / (4 * hx) + (mu[m2] + mu[m0]) / (2 * hx * hx)) * q2
                B3[m0] = (-(v[m3] + v[m0]) / (4 * hy) + (mu[m3] + mu[m0]) / (2 * hy * hy)) * q3
                B4[m0] = ((v[m4] + v[m0]) / (4 * hy) + (mu[m4] + mu[m0]) / (2 * hy * hy)) * q4
        
                # Расчет коэффициентов, стоящих в окрестности центра шаблона на предыдущем временном слое
                B6[m0] = (1 - sigma) * B1[m0]
                B7[m0] = (1 - sigma) * B2[m0]
                B8[m0] = (1 - sigma) * B3[m0]
                B9[m0] = (1 - sigma) * B4[m0]
        
                # Учет веса схемы для коэффициентов, стоящих в окрестности центра шаблона на текущем временном слое
                B1[m0] = sigma * B1[m0]
                B2[m0] = sigma * B2[m0]
                B3[m0] = sigma * B3[m0]
                B4[m0] = sigma * B4[m0]

                # Расчет коэффициентов для узлов, стоящих в центре шаблона на текущем временном слое
                A[m0] = q0 / ht + B1[m0] + B2[m0] + B3[m0] + B4[m0] - sigma * (abs(q1 - q2) * alphax + abs(q3 - q4) * alphay) * mu[m0]

                if (A[m0] == 0):
                    print("ВСЕ ПЛОХО!!!! " + str(m0) )
        
                # Расчет коэффициентов для узлов, стоящих в центре шаблона на предыдущем временном слое
                B5[m0] = q0 / ht - B6[m0] - B7[m0] - B8[m0] - B9[m0] + (1 - sigma) * (abs(q1 - q2) * alphay + abs(q3 - q4) * alphay) * mu[m0]
                
                # Расчёт значения правых частей сеточных уравнений
                F[m0] = q0 * f[m0] - abs(q1 - q2) * mu[m0] * betax - abs(q3 - q4) * mu[m0] * betay + B5[m0] * C[m0] + B6[m0] * C[m1] + B7[m0] * C[m2] + B8[m0] * C[m3] + B9[m0] * C[m4]

        seidel(A, B1, B2, B3, B4, F, C, eps, Nx, Ny);

        t += ht
        print(t)
  
        if not (t <= lt + ht / 2):
            break

def seidel(A, B1, B2, B3, B4, F, C, eps, Nx, Ny):
    it = 0
    matrix_result = [[0.0] * Ny for _ in range(Nx)]

    # Начало цикла по итерациям метода решения сеточных уравнений
    while True:
        # Задание начального значения для отклонения
        max_val = 0

        for i in range(1, Nx - 1):
            for j in range(1, Ny - 1):

                # if i > 40 and j > 70 and i < 50 and j < 80:
                #     continue
                
                m0 = i + j * Nx
                # Значения номеров элементов, стоящих в окрестности центра шаблона
                m1 = m0 + 1
                m2 = m0 - 1
                m3 = m0 + Nx
                m4 = m0 - Nx

                # Сохранение концентрации в заданном узле
                r = C[m0]

                # Вычисление нового значения концентрации в заданном узле
                C[m0] = (F[m0] + B1[m0] * C[m1] + B2[m0] * C[m2] + B3[m0] * C[m3] + B4[m0] * C[m4]) / A[m0]

                matrix_result[i][j] = C[m0]

                r -= C[m0]

                if max_val < abs(r):
                    max_val = abs(r)

        it += 1
        if max_val <= eps:
            break

    matrixResultInTimeRange.append(matrix_result);

    return matrix_result

def write_matrix_to_excel(matrix_lists, file_path, steps):
    for step in steps:
        workbook = Workbook()
        sheet = workbook.active
        sheet.title = "MatrixData"

        for row_num, row_data in enumerate(matrix_lists[step]):
            row = [cell_value for cell_value in row_data]
            sheet.append(row)

        output_file_path = f"output{step}.xlsx"
        workbook.save(output_file_path)

calculate()

write_matrix_to_excel(matrixResultInTimeRange, 'dsa', [0, 10, 30, 50, 99])
