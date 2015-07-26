CREATE TABLE IF NOT EXISTS `acc_accesslog` (
`id` int(11) NOT NULL,
  `idPerson` int(11) NOT NULL,
  `idPlace` int(11) NOT NULL,
  `accessType` char(3) NOT NULL,
  `date` datetime NOT NULL ,
  `updateBy` int(11) NOT NULL,
  `updateOn` datetime NOT NULL ,
  `comments` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acc_person`
--

CREATE TABLE IF NOT EXISTS `acc_person` (
`id` int(11) NOT NULL,
  `number` varchar(10) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `birth` date NOT NULL,
  `expiry` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `isSystemUser` tinyint(1) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedOn` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `acc_person`
--

INSERT INTO `acc_person` (`id`, `number`, `fullname`, `birth`, `expiry`, `gender`, `comments`, `isSystemUser`, `updatedBy`, `updatedOn`) VALUES
(1, '111010745', 'admin', '2015-06-22', '2015-06-22', 'M', 'admin system', 1, 1, '2015-06-22 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `acc_place`
--

CREATE TABLE IF NOT EXISTS `acc_place` (
`id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `comments` varchar(255) NOT NULL,
  `updatedBy` int(11) NOT NULL,
  `updatedOn` datetime NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `acc_place`
--

INSERT INTO `acc_place` (`id`, `name`, `comments`, `updatedBy`, `updatedOn`) VALUES
(1, 'SYSTEM', 'SYSTEM', 1, '0000-00-00 00:00:00'),
(2, 'BODEGA', 'BODEGA', 1, '0000-00-00 00:00:00'),
(3, 'PLANTA BAJA', 'PLANTA BAJA', 1, '2015-07-02 00:00:00'),
(4, 'PLANTA ALTA', 'PLANTA ALTA', 1, '2015-07-02 00:00:00');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `acc_accesslog`
--
ALTER TABLE `acc_accesslog`
 ADD PRIMARY KEY (`id`), ADD KEY `idPerson` (`idPerson`,`idPlace`,`updateBy`), ADD KEY `updateBy` (`updateBy`), ADD KEY `idPlace` (`idPlace`);

--
-- Indices de la tabla `acc_person`
--
ALTER TABLE `acc_person`
 ADD PRIMARY KEY (`id`), ADD UNIQUE KEY `number` (`number`);

--
-- Indices de la tabla `acc_place`
--
ALTER TABLE `acc_place`
 ADD PRIMARY KEY (`id`), ADD KEY `updatedBy` (`updatedBy`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `acc_accesslog`
--
ALTER TABLE `acc_accesslog`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `acc_person`
--
ALTER TABLE `acc_person`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `acc_place`
--
ALTER TABLE `acc_place`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `acc_accesslog`
--
ALTER TABLE `acc_accesslog`
ADD CONSTRAINT `acc_accesslog_ibfk_1` FOREIGN KEY (`idPerson`) REFERENCES `acc_person` (`id`),
ADD CONSTRAINT `acc_accesslog_ibfk_2` FOREIGN KEY (`idPlace`) REFERENCES `acc_place` (`id`),
ADD CONSTRAINT `acc_accesslog_ibfk_3` FOREIGN KEY (`updateBy`) REFERENCES `acc_person` (`id`);

--
-- Filtros para la tabla `acc_place`
--
ALTER TABLE `acc_place`
ADD CONSTRAINT `acc_place_ibfk_1` FOREIGN KEY (`updatedBy`) REFERENCES `acc_person` (`id`);
