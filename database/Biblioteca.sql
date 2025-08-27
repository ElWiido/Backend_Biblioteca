create database Biblioteca_2;

use Biblioteca_2;

CREATE TABLE usuarios (
    usuario_id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    apellido NVARCHAR(100) NOT NULL,
    correo NVARCHAR(150) NOT NULL UNIQUE,
    telefono NVARCHAR(20),
    direccion NVARCHAR(255)
);

CREATE TABLE estados (
    estado_id INT PRIMARY KEY IDENTITY(1,1),
    nombre_estado NVARCHAR(50) NOT NULL
);

CREATE TABLE autores (
    autor_id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL,
    apellido NVARCHAR(100) NOT NULL,
    pais_origen NVARCHAR(100)
);

CREATE TABLE editoriales (
    editorial_id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(150) NOT NULL,
    direccion NVARCHAR(255)
);

CREATE TABLE generos (
    genero_id INT PRIMARY KEY IDENTITY(1,1),
    nombre NVARCHAR(100) NOT NULL
);

CREATE TABLE libros (
    libro_id INT PRIMARY KEY IDENTITY(1,1),
    titulo NVARCHAR(255) NOT NULL,
    fecha_publicacion DATE,
    autor_id INT NOT NULL,
    editorial_id INT NOT NULL,
    genero_id INT NOT NULL,
    estado_id INT NOT NULL,
    FOREIGN KEY (autor_id) REFERENCES autores(autor_id),
    FOREIGN KEY (editorial_id) REFERENCES editoriales(editorial_id),
    FOREIGN KEY (genero_id) REFERENCES generos(genero_id),
    FOREIGN KEY (estado_id) REFERENCES estados(estado_id)
);

CREATE TABLE prestamos_libros (
    prestamo_id INT PRIMARY KEY IDENTITY(1,1),
    usuario_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_entrega DATE NOT NULL,
    fecha_devolucion DATE NULL,
    codigo INT,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id),
    FOREIGN KEY (libro_id) REFERENCES libros(libro_id)
);

-- ========================
-- USUARIOS
-- ========================
INSERT INTO usuarios (nombre, apellido, correo, telefono, direccion)
VALUES
('Carlos', 'Garc a', 'carlos.garcia@example.com', '3001234567', 'Calle 10 #25-34'),
('Mar a', 'L pez', 'maria.lopez@example.com', '3109876543', 'Carrera 15 #45-67'),
('Juan', 'Mart nez', 'juan.martinez@example.com', '3205557890', 'Av. 30 #20-10'),
('Ana', 'Ram rez', 'ana.ramirez@example.com', '3012223344', 'Calle 50 #12-45'),
('Pedro', 'Torres', 'pedro.torres@example.com', '3154445566', 'Carrera 8 #34-22');

-- ========================
-- ESTADOS
-- ========================
INSERT INTO estados (nombre_estado)
VALUES
('Disponible'),
('Prestado');

-- ========================
-- AUTORES
-- ========================
INSERT INTO autores (nombre, apellido, pais_origen)
VALUES
('Gabriel', 'Garcia Marquez', 'Colombia'),
('Isabel', 'Allende', 'Chile'),
('Mario', 'Vargas Llosa', 'Per '),
('Jorge Luis', 'Borges', 'Argentina'),
('Julio', 'Cort zar', 'Argentina');

-- ========================
-- EDITORIALES
-- ========================
INSERT INTO editoriales (nombre, direccion)
VALUES
('Editorial Planeta', 'Calle 45 #12-34 Bogota'),
('Penguin Random House', 'Av. 80 #50-20 Medellin'),
('Alfaguara', 'Carrera 7 #30-15 Cali'),
('Seix Barral', 'Calle 12 #5-40 Buenos Aires'),
('Anagrama', 'Passeig de Gracia 12, Barcelona');

-- ========================
-- G NEROS
-- ========================
INSERT INTO generos (nombre)
VALUES
('Novela'),
('Cuento'),
('Ensayo'),
('Poes a'),
('Teatro');

-- ========================
-- LIBROS
-- ========================
INSERT INTO libros (titulo, fecha_publicacion, autor_id, editorial_id, genero_id, estado_id)
VALUES
('Cien a os de soledad', '1967-05-30', 1, 1, 1, 1),
('La casa de los esp ritus', '1982-01-01', 2, 2, 1, 1),
('La ciudad y los perros', '1963-01-01', 3, 3, 1, 1),
('Ficciones', '1944-01-01', 4, 4, 2, 1),
('Rayuela', '1963-01-01', 5, 5, 1, 1);
