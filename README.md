# MySQL Database Backup

A simple Node script made with TypeScript to dump a mysql database and send it to a FTP server.

# How to use?

To start using it, follow these steps:
1. Clone this repo with `git clone github.com/HeyyCzer/mysql-database-backup mysql-backup`
2. Open the folder with `cd mysql-backup` and install the dependencies with `npm i` or other package manager (pnpm, yarn etc.)
3. Duplicate the file `config.example.json` to `config.json`
4. Config your `source` (the MySQL Database). I personally recommend you to put read-only credentials in it.
5. Config your `destination` (the FTP server).
6. Execute `npm build`
7. After this, `node dist/src`
8. Done!

# Configuration

- **cronExpression**: A string representing a cron expression, typically used for scheduling tasks to be executed at specific times or intervals.
- **keepFiles**: A number indicating the maximum number of files to retain.
- **safeAmountOfFiles**: Another number indicating a threshold for a safe amount of files.
- **source**: An object containing information about the source of the data, which in this case is a MySQL database.
  - **access**: An object with details required for accessing the MySQL database, including:
    - **host**: A string representing the host name or IP address of the MySQL server.
    - **port**: A number indicating the port number to connect to the MySQL server.
    - **user**: A string representing the username for authenticating with the MySQL database.
    - **password**: A string representing the password for authenticating with the MySQL database.
    - **database**: A string representing the name of the MySQL database.
- **destination**: An object containing information about the destination where data will be stored, which in this case is an FTP server.
  - **access**: An object with details required for accessing the FTP server, including:
    - **host**: A string representing the host name or IP address of the FTP server.
    - **port**: A number indicating the port number to connect to the FTP server.
    - **user**: A string representing the username for authenticating with the FTP server.
    - **password**: A string representing the password for authenticating with the FTP server.
    - **secure**: (Optional) A boolean indicating whether a secure connection is required.
    - **secureOptions**: (Optional) Any additional options related to security.
  - **path**: A string representing the path on the FTP server where the data will be stored.
