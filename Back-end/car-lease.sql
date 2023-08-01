-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 09 juil. 2023 à 17:08
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.1.17

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `car-lease`
--

-- --------------------------------------------------------

--
-- Structure de la table `car`
--

CREATE TABLE `car` (
  `marque` varchar(255) NOT NULL,
  `modele` varchar(255) NOT NULL,
  `annee` int(100) NOT NULL,
  `tarifs` int(100) NOT NULL,
  `immatriculation` varchar(255) NOT NULL,
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `isOccupied` varchar(255) NOT NULL,
  `agency` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `car`
--

INSERT INTO `car` (`marque`, `modele`, `annee`, `tarifs`, `immatriculation`, `id`, `image`, `isOccupied`, `agency`) VALUES
('isuzu', '2020', 1999, 658984, '54tu652', 1, '\\images\\dacia.jpg', 'false', 'taran agency'),
('ford', 'eco', 2004, 987654, '654tu123', 2, '\\images\\ford-eco.jpg', 'true', 'Awne'),
('hyundai', 'uno', 2014, 123, '123tu47', 3, '\\images\\hyundai.jpg', 'false', 'Awne'),
('scoda', 'scala', 2011, 456, '654tu25', 4, '\\images\\scoda-scala.jpg', 'true', 'Tyuna'),
('seat', 'arona', 2015, 478, '654tu23', 5, '\\images\\seat-arona.jpg', 'false', 'Tynua'),
('seat', 'arona', 2017, 459, '321tu52', 6, '\\images\\seat-ibiza.jpg', 'false', 'Awne'),
('skoda', 'fabia', 2000, 159, '245tu34', 7, '\\images\\skoda-fabia.jpg', 'false', 'Tynia'),
('suzuki', 'swift', 2019, 6548, '123tu210', 8, '\\images\\suzuki-swift.jpg', 'false', 'Awne'),
('volsvagen', 'polo', 2012, 187, '784tu240', 9, '\\images\\volsvagen-polo.jpg', 'false', 'Hatie'),
('volswagen', 'golf', 2020, 154, '354tu45', 10, '\\images\\vw-golf.jpg', 'false', 'Tynia'),
('ford', 'white', 2023, 657, '456tu32', 11, '\\images\\ford-eco.jpg', 'true', 'Harya'),
('symbol', 'a09', 2016, 573, '453tu87', 12, '\\images\\volsvagen-polo.jpg', 'false', 'Harya');

-- --------------------------------------------------------

--
-- Structure de la table `reservation`
--

CREATE TABLE `reservation` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date_start` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `finished` varchar(255) NOT NULL,
  `car` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `reservation`
--

INSERT INTO `reservation` (`id`, `email`, `date_start`, `duration`, `cost`, `finished`, `car`) VALUES
(50, 'salwa@exemple.com', '2023-07-12', 15, 500, 'true', 9),
(60, 'salwa@exemple.com', '2022-05-20', 3, 300, 'false', 4),
(70, 'maria@ex.com', '2023-08-06', 10, 1000, 'false', 2),
(80, 'alain@ex.com', '2023-01-05', 5, 550, 'true', 8),
(82, 'alain@ex.com', '2023-07-29', 14, 210, 'true', 7),
(84, 'alain@ex.com', '2023-07-30', 20, 300, 'true', 3),
(86, 'alain@ex.com', '2023-07-31', 20, 300, 'true', 3),
(87, 'alain@ex.com', '2023-07-05', 20, 300, 'true', 3),
(88, 'salwa@exemple.com', '2023-08-14', 15, 225, 'true', 10),
(89, 'salwa@exemple.com', '2023-07-31', 15, 225, 'true', 8),
(90, 'walid@gmail.com', '2023-09-18', 45, 675, 'true', 12),
(91, 'walid@gmail.com', '2023-07-31', 23, 345, 'false', 11),
(92, 'salwa@exemple.com', '2023-10-23', 14, 210, 'true', 5),
(93, 'salwa@exemple.com', '2023-07-30', 74, 1110, 'true', 3);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`username`, `email`, `pass`, `phone`, `country`) VALUES
('alain', 'alain@ex.com', '123', '254891', 'belgique'),
('alex', 'alex@ex.com', '123', '258', 'usa'),
('hosni', 'hosni@ex.com', '123', '259741', 'tunisia'),
('jacer', 'jacer@exp.com', '123', '285946', 'tunisia'),
('maria', 'maria@ex.com', '123', '369', 'uk'),
('Salwa', 'salwa@exemple.com', '123', '+21658057716', 'Tunisia'),
('walid', 'walid@gmail.com', '123', '321654', 'Kebili');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_car_user_email` (`email`),
  ADD KEY `fk_car_reservation` (`car`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `car`
--
ALTER TABLE `car`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=94;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `reservation`
--
ALTER TABLE `reservation`
  ADD CONSTRAINT `fk_car_reservation` FOREIGN KEY (`car`) REFERENCES `car` (`id`),
  ADD CONSTRAINT `fk_car_user_email` FOREIGN KEY (`email`) REFERENCES `users` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
