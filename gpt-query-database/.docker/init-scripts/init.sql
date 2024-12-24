IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'db_test')
BEGIN
    EXEC sp_executesql N'CREATE DATABASE [db_test]'
END
GO

USE db_test;
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'Employees')
BEGIN
    CREATE TABLE Employees (
        ID       INT PRIMARY KEY IDENTITY(1,1),
        Name     NVARCHAR(100),
        CPF      CHAR(11) NOT NULL,
        RG       CHAR(9) NOT NULL,
        Position NVARCHAR(100),
        Age      INT,
        Address  NVARCHAR(255)
    );
END
GO

-- Insert 50 random employees
IF NOT EXISTS (SELECT * FROM Employees)
BEGIN
    INSERT INTO Employees (Name, CPF, RG, Position, Age, Address)
    VALUES ('John Doe', '12345678901', 'MG1234567', 'Manager', 35, '123 Main St'),
    ('Jane Smith', '10987654321', 'SP9876543', 'Developer', 29, '456 Oak Ave'),
    ('Alice Johnson', '11223344556', 'RJ1122334', 'Analyst', 41, '789 Pine Rd'),
    ('Bob Brown', '55443322110', 'DF5566778', 'Tester', 38, '101 Maple Dr'),
    ('Carol White', '66778899000', 'RS9988776', 'Admin', 45, '202 Cedar St'),
    ('David Green', '99887766554', 'PR4433221', 'Consultant', 50, '303 Birch Blvd'),
    ('Eva Black', '33445566778', 'CE1122334', 'Coordinator', 28, '404 Elm St'),
    ('Frank Harris', '55667788990', 'GO9876543', 'Support', 34, '505 Willow Way'),
    ('Grace King', '88776655443', 'BA5544332', 'Specialist', 37, '606 Fir Ct'),
    ('Hank Lee', '22113344556', 'MA3322114', 'Lead', 42, '707 Oak Dr'),
    ('Ivy Lewis', '77889900112', 'SC4455667', 'Executive', 30, '808 Pine Ct'),
    ('Jack Martin', '99001122334', 'CE2211445', 'Supervisor', 31, '909 Maple Ave'),
    ('Katy Walker', '11122233344', 'MG5566778', 'Manager', 25, '1010 Cedar Blvd'),
    ('Liam Wright', '44455566677', 'SP9988776', 'Developer', 27, '1111 Willow St'),
    ('Mona Adams', '55566677788', 'RJ1122334', 'Analyst', 40, '1212 Birch Dr'),
    ('Nina Thompson', '66677788899', 'DF4433221', 'Tester', 33, '1313 Elm Ct'),
    ('Owen Young', '77788899900', 'RS9988776', 'Admin', 39, '1414 Pine Dr'),
    ('Paula Allen', '88899900011', 'PR5566778', 'Consultant', 26, '1515 Maple St'),
    ('Quincy Scott', '99900011122', 'CE6655443', 'Coordinator', 32, '1616 Cedar Ave'),
    ('Rachel Moore', '00011122233', 'GO7788990', 'Support', 28, '1717 Oak Ct'),
    ('Steve Clark', '11122233344', 'BA8877665', 'Specialist', 34, '1818 Pine Blvd'),
    ('Tina Rodriguez', '22233344455', 'MA9988776', 'Lead', 29, '1919 Maple Dr'),
    ('Ursula Nelson', '33344455566', 'SC1122334', 'Executive', 31, '2020 Birch Ave'),
    ('Victor Turner', '44455566677', 'CE5566778', 'Supervisor', 36, '2121 Cedar St'),
    ('Wendy Collins', '55566677788', 'MG9988776', 'Manager', 35, '2222 Willow Ct'),
    ('Xander Moore', '66677788899', 'SP5566778', 'Developer', 29, '2323 Oak Blvd'),
    ('Yara Brown', '77788899900', 'RJ9988776', 'Analyst', 42, '2424 Pine St'),
    ('Zachary Gray', '88899900011', 'DF5566778', 'Tester', 33, '2525 Maple Ct'),
    ('Alice King', '99900011122', 'RS8877665', 'Admin', 27, '2626 Cedar Dr'),
    ('Bob Adams', '00011122233', 'PR9988776', 'Consultant', 29, '2727 Birch St'),
    ('Carol Lee', '11122233344', 'CE5566778', 'Coordinator', 32, '2828 Oak Ave'),
    ('David Wilson', '22233344455', 'GO9988776', 'Support', 38, '2929 Pine Ct'),
    ('Eva Scott', '33344455566', 'BA5566778', 'Specialist', 30, '3030 Maple Blvd'),
    ('Frank Wright', '44455566677', 'MA9988776', 'Lead', 29, '3131 Cedar St'),
    ('Grace Johnson', '55566677788', 'SC1122334', 'Executive', 35, '3232 Willow Ct'),
    ('Hank White', '66677788899', 'CE5566778', 'Supervisor', 32, '3333 Oak Dr'),
    ('Ivy Green', '77788899900', 'MG9988776', 'Manager', 28, '3434 Pine St'),
    ('Jack Adams', '88899900011', 'SP5566778', 'Developer', 37, '3535 Maple Ave'),
    ('Katy Lewis', '99900011122', 'RJ9988776', 'Analyst', 31, '3636 Cedar Ct'),
    ('Liam Moore', '00011122233', 'DF5566778', 'Tester', 29, '3737 Birch Blvd'),
    ('Mona Brown', '11122233344', 'RS9988776', 'Admin', 34, '3838 Oak Ave'),
    ('Nina Clark', '22233344455', 'PR5566778', 'Consultant', 32, '3939 Pine Dr'),
    ('Owen Scott', '33344455566', 'CE9988776', 'Coordinator', 27, '4040 Maple Ct'),
    ('Paula Wilson', '44455566677', 'GO5566778', 'Support', 29, '4141 Cedar St'),
    ('Quincy Lewis', '55566677788', 'BA9988776', 'Specialist', 31, '4242 Willow Ave'),
    ('Rachel Green', '66677788899', 'MA5566778', 'Lead', 33, '4343 Oak Ct'),
    ('Steve Adams', '77788899900', 'SC9988776', 'Executive', 35, '4444 Pine Dr'),
    ('Tina Wilson', '88899900011', 'CE5566778', 'Supervisor', 30, '4545 Maple St'),
    ('Ursula Scott', '99900011122', 'MG9988776', 'Manager', 32, '4646 Cedar Ave'),
    ('Victor Moore', '00011122233', 'SP5566778', 'Developer', 27, '4747 Birch Ct'),
    ('Wendy Green', '11122233344', 'RJ9988776', 'Analyst', 29, '4848 Oak Blvd'),
    ('Xander Wilson', '22233344455', 'DF5566778', 'Tester', 31, '4949 Pine Ct'),
    ('Yara Adams', '33344455566', 'CE9988776', 'Admin', 33, '5050 Maple Dr'),
    ('Zachary King', '44455566677', 'GO5566778', 'Consultant', 30, '5151 Cedar Ct')
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'Companies')
BEGIN
    CREATE TABLE Companies (
        ID       INT PRIMARY KEY IDENTITY(1,1),
        Name     NVARCHAR(100),
        Address  NVARCHAR(255)
    );
END
GO

IF NOT EXISTS (SELECT * FROM Companies)
BEGIN
    INSERT INTO Companies (Name, Address)
    VALUES ('Google', 'European Headquarters 1st & 2nd Floors Gordon House Barrow Street Dublin 4 Ireland fax: +353 (1) 436 1001'),
        ('Meta', '1 Hacker Wy, Menlo Park, CA 94025, United States'),
        ('Amazon', '410 Terry Ave N, Seattle 98109, WA'),
        ('X', 'Market Square, 1355 Market St suite 900, San Francisco, CA 94103, United States'),
        ('Microsoft', 'Redmond, Washington, U.S');
END

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = N'EmployeeCompany')
BEGIN
    CREATE TABLE EmployeeCompany (
        EmployeeID INT FOREIGN KEY REFERENCES Employees(ID),
        CompanyID  INT FOREIGN KEY REFERENCES Companies(ID),
        PRIMARY KEY (EmployeeID, CompanyID)
    );
END
GO

IF NOT EXISTS (SELECT * FROM EmployeeCompany)
BEGIN
    INSERT INTO EmployeeCompany (CompanyID, EmployeeID)
    VALUES (1, 2), 
        (1, 13),
        (1, 14),
        (1, 15),
        (1, 16),
        (2, 4), 
        (3, 6), 
        (3, 7), 
        (3, 9), 
        (4, 8), 
        (5, 11);
END
GO
