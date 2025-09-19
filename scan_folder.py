import os

def list_directory_contents(path):
    """
    Recursively scans a directory and prints a tree-like structure
    of all files and subdirectories.
    
    Args:
        path (str): The path to the directory to scan.
    """
    print(f"Scanning directory: {os.path.abspath(path)}\n")
    
    if not os.path.isdir(path):
        print("Error: The provided path is not a valid directory.")
        return

    # os.walk is a powerful tool that generates the file names in a directory tree
    # by walking the tree either top-down or bottom-up.
    for dirpath, dirnames, filenames in os.walk(path):
        # Calculate the indentation level based on the current directory's depth
        # to create a clean, tree-like structure.
        level = dirpath.replace(path, '').count(os.sep)
        indent = ' ' * 4 * level
        
        # Print the current directory.
        print(f'{indent}📂 {os.path.basename(dirpath)}/')
        subindent = ' ' * 4 * (level + 1)
        
        # Print all files in the current directory.
        for file in filenames:
            print(f'{subindent}📄 {file}')

if __name__ == '__main__':
    # Set the path to the folder you want to scan.
    # Replace the text inside the parentheses with the path to your 'health-career-adventure' folder.
    project_path = '/Users/user/health-career-adventure'
    
    list_directory_contents(project_path)
