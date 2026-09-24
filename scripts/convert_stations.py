import json
import os

input_file = '../data/raw_stations.txt'
output_file = '../data/stations.json'

stations = []
current_station = {}
line_count = 0

print("Reading raw station data...")
try:
    with open(input_file, 'r') as f:
        lines = f.readlines()
        
        for line in lines:
            line = line.strip()
            if not line:
                continue
                
            if line_count == 0:
                current_station['name'] = line
            elif line_count == 1:
                current_station['state_city'] = line
            elif line_count == 2:
                current_station['code'] = line
                stations.append(current_station)
                current_station = {}
                line_count = -1 # Reset for next station
                
            line_count += 1

    # Save to JSON
    with open(output_file, 'w') as out_f:
        json.dump(stations, out_f, indent=4)
        
    print(f"Successfully converted {len(stations)} stations to JSON!")
    print(f"Saved to: {output_file}")

except Exception as e:
    print(f"Error: {e}")
