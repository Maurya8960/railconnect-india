import json
import os
import docx

# Aapke Desktop ki file ka path (Agar file ka naam alag hai, toh yahan change karein)
input_file = os.path.expanduser('~/Desktop/NEW DELHI.docx')
output_file = os.path.expanduser('~/Desktop/railconnect-india/data/stations.json')

print(f"Reading file from: {input_file}...")

try:
    doc = docx.Document(input_file)
    stations = []
    current_station = {}
    line_count = 0
    
    # Docx ke har paragraph/line ko read karein
    for para in doc.paragraphs:
        text = para.text.strip()
        if not text:
            continue  # Khali lines ko ignore karein
            
        if line_count == 0:
            current_station['name'] = text
        elif line_count == 1:
            current_station['state_city'] = text
        elif line_count == 2:
            current_station['code'] = text
            stations.append(current_station)
            current_station = {}
            line_count = -1 # Next station ke liye reset karein
            
        line_count += 1

    # Data ko JSON format mein save karein
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(stations, f, indent=4, ensure_ascii=False)
        
    print(f"✅ Successfully converted {len(stations)} stations to JSON!")
    print(f"✅ Saved to: {output_file}")
    
except Exception as e:
    print(f"❌ Error: {e}")
    print("Kripya check karein ki kya Desktop par file ka naam exactly 'NEW DELHI.docx' hai?")
