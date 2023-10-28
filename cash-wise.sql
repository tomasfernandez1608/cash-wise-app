
CREATE TABLE `cliente` (
  `idusuario` int(11) NOT NULL,
  `tipousuario` varchar(100) DEFAULT NULL,
  `sueldomensual` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`idusuario`, `tipousuario`, `sueldomensual`) VALUES
(2, 'Básico', 240000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operaciones`
--

CREATE TABLE `operaciones` (
  `id_operacion` int(11) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fechaoperacion` date NOT NULL,
  `cliente_idusuario` int(11) NOT NULL,
  `tipo_gasto_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `operaciones`
--

INSERT INTO `operaciones` (`id_operacion`, `monto`, `fechaoperacion`, `cliente_idusuario`, `tipo_gasto_id`) VALUES
(1, 3000.00, '2023-10-26', 2, 8),
(2, 4700.00, '2023-10-27', 2, 3),
(3, 1200.00, '2023-10-27', 2, 11),
(4, 5000.00, '2023-10-27', 2, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `premium`
--

CREATE TABLE `premium` (
  `estadopago` char(1) NOT NULL,
  `fecha_pago` date NOT NULL,
  `cliente_idusuario` int(11) NOT NULL,
  `premium_id` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recibo`
--

CREATE TABLE `recibo` (
  `numerofactura` varchar(250) NOT NULL,
  `monto` decimal(8,2) NOT NULL,
  `premium_premium_id` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_gasto`
--

CREATE TABLE `tipo_gasto` (
  `id_gasto` int(11) NOT NULL,
  `descripcion` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tipo_gasto`
--

INSERT INTO `tipo_gasto` (`id_gasto`, `descripcion`) VALUES
(1, 'Comidas y bebidas'),
(2, 'Transporte'),
(3, 'Supermercado'),
(4, 'Alquiler o hipoteca'),
(5, 'Entretenimiento'),
(6, 'Salud y cuidado personal'),
(7, 'Educación'),
(8, 'Ropa'),
(9, 'Facturas de servicios'),
(10, 'Viajes y vacaciones'),
(11, 'Mascotas'),
(12, 'Ahorros e inversiones'),
(13, 'Cuidado de niños'),
(14, 'Reparaciones y mantenimiento del hogar'),
(15, 'Membresías y suscripciones'),
(16, 'Otros');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `clave` varchar(100) NOT NULL,
  `resetpass` char(1) DEFAULT NULL,
  `estado` char(1) DEFAULT NULL,
  `fecharegistro` date NOT NULL,
  `fotoperfil` blob DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `nombre`, `apellido`, `correo`, `clave`, `resetpass`, `estado`, `fecharegistro`, `fotoperfil`) VALUES
(1, 'Ramiro', 'Tanquias', 'rtanquiascornejo@gmail.com', 'admin123', NULL, NULL, '2023-10-25', NULL),
(2, 'Pepe', 'Gonzalez', 'pepe@mail.com', 'pepe123', NULL, NULL, '2023-10-25', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD PRIMARY KEY (`id_operacion`),
  ADD KEY `operaciones_cliente_fk` (`cliente_idusuario`),
  ADD KEY `tipo_gasto_fk` (`tipo_gasto_id`);

--
-- Indices de la tabla `premium`
--
ALTER TABLE `premium`
  ADD PRIMARY KEY (`premium_id`),
  ADD UNIQUE KEY `premium__idx` (`cliente_idusuario`);

--
-- Indices de la tabla `recibo`
--
ALTER TABLE `recibo`
  ADD PRIMARY KEY (`numerofactura`),
  ADD KEY `recibo_premium_fk` (`premium_premium_id`);

--
-- Indices de la tabla `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  ADD PRIMARY KEY (`id_gasto`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `operaciones`
--
ALTER TABLE `operaciones`
  MODIFY `id_operacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `tipo_gasto`
--
ALTER TABLE `tipo_gasto`
  MODIFY `id_gasto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_usuario_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `cliente_usuario_fk` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`idusuario`);

--
-- Filtros para la tabla `operaciones`
--
ALTER TABLE `operaciones`
  ADD CONSTRAINT `operaciones_cliente_fk` FOREIGN KEY (`cliente_idusuario`) REFERENCES `cliente` (`idusuario`),
  ADD CONSTRAINT `tipo_gasto_fk` FOREIGN KEY (`tipo_gasto_id`) REFERENCES `tipo_gasto` (`id_gasto`);

--
-- Filtros para la tabla `premium`
--
ALTER TABLE `premium`
  ADD CONSTRAINT `premium_cliente_fk` FOREIGN KEY (`cliente_idusuario`) REFERENCES `cliente` (`idusuario`);

--
-- Filtros para la tabla `recibo`
--
ALTER TABLE `recibo`
  ADD CONSTRAINT `recibo_premium_fk` FOREIGN KEY (`premium_premium_id`) REFERENCES `premium` (`premium_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
