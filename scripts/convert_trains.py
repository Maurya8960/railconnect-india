import json
import os

input_file_docx = os.path.expanduser('~/Desktop/train list.docx')
input_file_txt = os.path.expanduser('~/Desktop/train list.txt')
output_file = os.path.expanduser('~/Desktop/railconnect-india/backend/data/trains.json')

trains = []
lines = []

try:
    import docx
    if os.path.exists(input_file_docx):
        print(f"Reading docx file from: {input_file_docx}...")
        doc = docx.Document(input_file_docx)
        lines = [p.text.strip() for p in doc.paragraphs if p.text.strip()]
except Exception as e:
    print(f"Could not read as docx: {e}")

if not lines and os.path.exists(input_file_txt):
    print(f"Reading text file from: {input_file_txt}...")
    with open(input_file_txt, 'r', encoding='utf-8') as f:
        lines = [line.strip() for line in f if line.strip()]

# Parse lines (Format e.g. "17281 - GNT NS EXP")
for line in lines:
    if '-' in line:
        parts = line.split('-', 1)
        train_no = parts[0].strip()
        train_name = parts[1].strip()
        trains.append({
            "number": train_no,
            "name": train_name
        })

# Unique trains filter karein
unique_trains = {t['number']: t for t in trains}.values()
trains_list = list(unique_trains)

os.makedirs(os.path.dirname(output_file), exist_ok=True)
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(trains_list, f, indent=4, ensure_ascii=False)

print(f"✅ Successfully converted {len(trains_list)} unique trains to JSON!")
print(f"✅ Saved to: {output_file}")
