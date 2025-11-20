import os

# Define the range of numbers
start, end = 0, 3332

def find_missing_images(start, end):
    # Get the current directory (where the script is located)
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Get all file names in the current directory
    files = os.listdir(current_dir)
    
    # Extract file numbers from filenames
    file_numbers = set()
    for file in files:
        if file.endswith(".png"):
            try:
                number = int(file.replace(".png", ""))
                file_numbers.add(number)
            except ValueError:
                continue
    
    # Find missing numbers in the range
    missing_numbers = [num for num in range(start, end + 1) if num not in file_numbers]
    return missing_numbers

def main():
    # Call the function
    missing_numbers = find_missing_images(start, end)
    
    # Output the missing numbers
    if missing_numbers:
        print("Missing PNG files:", missing_numbers)
    else:
        print("No missing PNG files.")

if __name__ == "__main__":
    main()
