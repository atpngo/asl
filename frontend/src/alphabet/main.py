import os
files = [f for f in os.listdir('.') if os.path.isfile(f) and f != 'main.py']

for f in files:
    with open(f, 'w+') as fin:
        contents = fin.read()
        new = contents.replace('fill="currentColor"', '')
        fin.seek(0)
        fin.truncate()
        fin.write(new)