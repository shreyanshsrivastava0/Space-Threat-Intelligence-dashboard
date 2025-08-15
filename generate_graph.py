import matplotlib.pyplot as plt
import numpy as np
import sys
import json
import io
import base64

# Receive data from Node.js as JSON
data_json = sys.argv[1]
data = json.loads(data_json)  # e.g., [2, 1, 3, 0, 4]

x = np.arange(len(data))
y = np.array(data)

plt.figure(figsize=(6,3))
plt.plot(x, y, marker='o', color='red', label='High-Risk Threats')
plt.title("Recent Space Threats")
plt.xlabel("Update Number")
plt.ylabel("Threat Count")
plt.grid(True)
plt.legend()

buf = io.BytesIO()
plt.savefig(buf, format='png')
buf.seek(0)
img_base64 = base64.b64encode(buf.getvalue()).decode('utf-8')
buf.close()
plt.close()

print(img_base64)
