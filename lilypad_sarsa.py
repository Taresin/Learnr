import sys

if len(sys.argv) != 3:
    print("Please provide two arguments: username and filename")
else:
    username = sys.argv[1]
    filename = sys.argv[2]
    print(f"{username} is the owner of {filename}")