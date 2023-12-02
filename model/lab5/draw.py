import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import glob

def read_excel(file_path):
    df = pd.read_excel(file_path, header=None)
    return df.to_numpy()

folder_path = "*.xlsx"

file_paths = glob.glob(folder_path)

file_paths.sort()

data_matrices = [read_excel(file_path) for file_path in file_paths]

fig, axes = plt.subplots(1, len(data_matrices), figsize=(15, 5))

for i, (data_matrix, file_path) in enumerate(zip(data_matrices, file_paths)):
    t = np.linspace(0, 1, data_matrix.shape[0])
    x, y = np.meshgrid(t, t)

    axis = axes[i]
    axis.set_title(f"Contour Plot for {file_path}")

    vmin = np.min(data_matrix)
    vmax = np.max(data_matrix)

    plot = axis.contourf(x, y, data_matrix, 100, cmap="Accent_r", vmin=vmin, vmax=vmax)
    cbar = plt.colorbar(plot, ax=axis)

plt.tight_layout()
plt.show()
