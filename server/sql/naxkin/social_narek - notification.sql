/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100132
 Source Host           : localhost:3306
 Source Schema         : social_narek

 Target Server Type    : MySQL
 Target Server Version : 100132
 File Encoding         : 65001

 Date: 16/11/2020 14:27:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chat
-- ----------------------------
DROP TABLE IF EXISTS `chat`;
CREATE TABLE `chat`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `status` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  CONSTRAINT `chat_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chat_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 27 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of chat
-- ----------------------------
INSERT INTO `chat` VALUES (20, 13, 14, 'barev', 0);
INSERT INTO `chat` VALUES (21, 13, 14, 'barev', 0);
INSERT INTO `chat` VALUES (22, 14, 13, 'barev', 0);
INSERT INTO `chat` VALUES (23, 13, 14, 'barev', 0);
INSERT INTO `chat` VALUES (24, 13, 14, 'barev', 0);
INSERT INTO `chat` VALUES (25, 14, 14, 'barev', 0);
INSERT INTO `chat` VALUES (26, 14, 13, 'barev', 0);

-- ----------------------------
-- Table structure for chatroom
-- ----------------------------
DROP TABLE IF EXISTS `chatroom`;
CREATE TABLE `chatroom`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  CONSTRAINT `chatroom_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chatroom_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of chatroom
-- ----------------------------

-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  `post_id` int(11) NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  INDEX `post_id`(`post_id`) USING BTREE,
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of comments
-- ----------------------------

-- ----------------------------
-- Table structure for friends
-- ----------------------------
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 310 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of friends
-- ----------------------------
INSERT INTO `friends` VALUES (278, 13, 14);
INSERT INTO `friends` VALUES (279, 13, 16);
INSERT INTO `friends` VALUES (282, 13, 11);
INSERT INTO `friends` VALUES (283, 13, 15);
INSERT INTO `friends` VALUES (284, 2, 1);
INSERT INTO `friends` VALUES (285, 2, 3);
INSERT INTO `friends` VALUES (286, 2, 4);
INSERT INTO `friends` VALUES (287, 2, 5);
INSERT INTO `friends` VALUES (288, 1, 6);
INSERT INTO `friends` VALUES (289, 1, 7);
INSERT INTO `friends` VALUES (290, 1, 8);
INSERT INTO `friends` VALUES (291, 3, 4);
INSERT INTO `friends` VALUES (292, 3, 5);
INSERT INTO `friends` VALUES (293, 3, 6);
INSERT INTO `friends` VALUES (294, 4, 8);
INSERT INTO `friends` VALUES (295, 4, 5);
INSERT INTO `friends` VALUES (296, 5, 11);
INSERT INTO `friends` VALUES (297, 7, 6);
INSERT INTO `friends` VALUES (298, 7, 12);
INSERT INTO `friends` VALUES (299, 6, 17);
INSERT INTO `friends` VALUES (300, 15, 7);
INSERT INTO `friends` VALUES (301, 8, 16);
INSERT INTO `friends` VALUES (302, 8, 15);
INSERT INTO `friends` VALUES (303, 9, 17);
INSERT INTO `friends` VALUES (304, 14, 9);
INSERT INTO `friends` VALUES (305, 9, 10);
INSERT INTO `friends` VALUES (306, 17, 12);
INSERT INTO `friends` VALUES (307, 14, 12);
INSERT INTO `friends` VALUES (308, 17, 4);
INSERT INTO `friends` VALUES (309, 17, 5);

-- ----------------------------
-- Table structure for likes
-- ----------------------------
DROP TABLE IF EXISTS `likes`;
CREATE TABLE `likes`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  `post_id` int(11) NULL DEFAULT NULL,
  `isLiked` tinyint(1) NULL DEFAULT NULL,
  `count` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  INDEX `post_id`(`post_id`) USING BTREE,
  CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `likes_ibfk_3` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of likes
-- ----------------------------

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `content` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `user_id` int(11) NULL DEFAULT NULL,
  `post_status` int(1) NOT NULL DEFAULT 0,
  `notification` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `note_type` int(11) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 84 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (1, 'Albert Krüger - Street in carrièresort', 'c8fy08pwke36clnl1597950298785Albert Krüger - Street in carrièresort.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (2, 'Auguste Renoir - The Little Algerian Girl', 'c8fy08pwke36dit61597950341754Auguste Renoir - The Little Algerian Girl.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (3, 'Giovanni Giacometti - Dreams of the future', 'c8fy08pwke36dz2f1597950362823Giovanni Giacometti - Dreams of the future.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (4, 'Henri Matisse - Cat With Red Fish', 'c8fy08pwke36eifi1597950387918Henri Matisse - Cat With Red Fish.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (5, 'Henri Matisse -Flowers', 'c8fy08pwke36f13b1597950412103Henri Matisse -Flowers.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (6, 'Henri Russo - Funny Monkey Jokers', 'c8fy08pwke36fk9q1597950436958Henri Russo - Funny Monkey Jokers.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (7, 'Jules Bastien-Lepage - Going to School', 'c8fy08pwke36ghn01597950480204Jules Bastien-Lepage - Going to School.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (8, 'Paul Klee - Roter-Ballon', 'c8fy08pwke36gzj81597950503396Paul Klee - Roter-Ballon.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (9, 'Vincent van Gogh - The Church in Auvers sur Oise', 'c8fy08pwke36hngj1597950534403Vincent van Gogh - The Church in Auvers sur Oise.jpg', 13, 0, '', '', 0);
INSERT INTO `posts` VALUES (10, 'Piet Mondrian', 'c8fy0f9wkeg554jp1598734330693s1200.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (11, 'Paul Gauguin ', 'c8fy0f9wkeg56ydu1598734416018dbfcb41dc73313fe941e726790337d08.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (12, 'Jean Carzou ', 'c8fy0f9wkeg586y71598734473775e4454743-7a74-4ca4-9fb7-220d85d0025e_570.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (13, 'Chaim Soutine', 'c8fy0f9wkeg59lse1598734539662Zarin-Chaim-Soutine_01.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (14, 'Gustav Klimt', 'c8fy0f9wkeg5b3x4159873460981629acd09bd4017e3362ef82042f035073--gustav-klimt-l-art.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (15, 'Henri Toulouse-Lautrec', 'c8fy0f9wkeg5d2qa1598734701586s1200.jpg', 4, 0, '', '', 0);
INSERT INTO `posts` VALUES (16, 'David Kakabadze', 'c8fy08j0keh90s8q1598801312762kakabadze_work_2014041007353316.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (17, 'Jean-François Millet', 'c8fy08j0keh91nob1598801353499jean-francois_millet_ii_005.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (18, 'Wassily Kandinsky', 'c8fy08j0keh93ddf15988014334591977.77_tension-suave-no-85.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (19, 'Diego  Velázquez', 'c8fy08j0keh96oxj1598801588407zavtrak-diego-velaskes_1.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (20, 'Diego Velázquez', 'c8fy08j0keh97zvi1598801649246image649_0.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (21, 'Jean-Baptiste Greuze', 'c8fy08j0keh99nhq15988017265106f9447441a41c7cedef204d8b8cf0488.jpg', 1, 0, '', '', 0);
INSERT INTO `posts` VALUES (22, 'Giotto di Bondone', 'c8fy08j0keha7krb1598803309271St-Francis-of-Assisi-Stigmata-Giotto-di-1300.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (23, 'Robert Campin', 'c8fy08j0kehaaoie1598803454102Robert_campin_master_of_flemalle_-christ_on_the_cross.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (24, 'Jan van Eyck', 'c8fy08j0kehadm9v1598803591171download.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (25, 'Giovanni Bellini', 'c8fy08j0kehag0ci1598803702722giovanni-bellini.jpg!Portrait.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (26, 'Mazzocco', 'c8fy07jgkehairay1598803830970mazacco_work_2014072117013211.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (27, 'Filippo Lippi', 'c8fy07jgkehakzfk159880393481678256cf81f97a22021810128fdf6e239.jpg', 2, 0, '', '', 0);
INSERT INTO `posts` VALUES (28, 'Lorenzo Veneziano', 'c8fy08t8kehas0wd1598804263309unnamed.jpg', 8, 0, '', '', 0);
INSERT INTO `posts` VALUES (29, 'Benozzo Gozzoli', 'c8fy08t8kehauh451598804377637e797f149-566b-4b49-85e1-8eaabc7d2797.jpg!PinterestLarge.jpg', 8, 0, '', '', 0);
INSERT INTO `posts` VALUES (30, 'Andrea Mantegna', 'c8fy08t8kehaw7gf1598804458431220px-Andrea_Mantegna_014.jpg', 8, 0, '', '', 0);
INSERT INTO `posts` VALUES (31, 'Clyfford Still ', 'c8fy08t8kehayqsa1598804576794d8f776a55a7a2bb0f3ac3a89e556b586.jpg', 9, 0, '', '', 0);
INSERT INTO `posts` VALUES (32, 'Hieronymus Bosch', 'c8fy08t8kehb183115988046925255041e90823a405d460d69fe43d3b3a81.jpg', 9, 0, '', '', 0);
INSERT INTO `posts` VALUES (33, 'James Whistler', 'c8fy08t8kehb2t981598804766620Symphony-in-White-No-1-The-White-1862.jpg', 9, 0, '', '', 0);
INSERT INTO `posts` VALUES (34, 'Marc Chagall', 'c8fy08t8kehb51rh1598804870957image884.jpg', 12, 0, '', '', 0);
INSERT INTO `posts` VALUES (35, 'Titian', 'c8fy08t8kehb6gw61598804937222unnamed (1).jpg', 12, 0, '', '', 0);
INSERT INTO `posts` VALUES (36, 'Katsushika Hokusai', 'c8fy08t8kehb7v7t15988050024413933.jpg', 12, 0, '', '', 0);
INSERT INTO `posts` VALUES (37, 'Katsushika Hokusai', 'c8fy08t8kehbaco315988051183712019_NYR_17148_0243_000(katsushika_hokusai_bushu_tamagawa).jpg', 8, 0, '', '', 0);
INSERT INTO `posts` VALUES (38, 'Hieronymus Bosch', 'c8fy08t8kehbccvs1598805211960Hieronymus_Bosch_099.jpg', 9, 0, '', '', 0);
INSERT INTO `posts` VALUES (39, 'Tintoretto', 'c8fy08t8kehbfbia1598805350146tintorettocrucifixionsanroccod1.jpg', 12, 0, '', '', 0);
INSERT INTO `posts` VALUES (40, 'Washington Allston', 'c8fy0ay8kehiq1ro1598817608052Allston_TheFlightofFlorimelli.jpg', 14, 0, '', '', 0);
INSERT INTO `posts` VALUES (41, 'Chuta Kimura', 'c8fy0ay8kehiqomp159881763768101.jpg', 14, 0, '', '', 0);
INSERT INTO `posts` VALUES (42, 'Jean-Auguste-Dominique Ingres', 'c8fy0ay8kehisgqw1598817720776Jean-Auguste-Dominique_Ingres_-_Comtesse_dHaussonville_-_Google_Art_Project.jpg', 14, 0, '', '', 0);
INSERT INTO `posts` VALUES (43, 'Théodore Géricault ', 'c8fy0ay8kehitnla1598817776302download (1).jpg', 14, 0, '', '', 0);
INSERT INTO `posts` VALUES (44, 'Samuel Morse', 'c8fy0ay8kehiw2t11598817889333Samuel_Finley_Breese_Morse_-_Little_Miss_Hone_-_48.455_-_Museum_of_Fine_Arts.jpg', 15, 0, '', '', 0);
INSERT INTO `posts` VALUES (45, 'Antonio Canova', 'c8fy0ay8kehixkil1598817958941canova_danzatrice_che_si_regge_il_velo_volta_a_destra.jpg', 15, 0, '', '', 0);
INSERT INTO `posts` VALUES (46, 'Friedrich Overbeck', 'c8fy0ay8kehiz2eb1598818028771Friedrich_Overbeck_-_Vittoria_Caldoni_1.jpg', 15, 0, '', '', 0);
INSERT INTO `posts` VALUES (47, 'Camille Corot', 'c8fy0ay8kehj0h9u1598818094706DT2129.jpg', 15, 0, '', '', 0);
INSERT INTO `posts` VALUES (48, 'Jean-Étienne Liotard', 'c8fy0ay8kehj377i1598818221630download (2).jpg', 5, 0, '', '', 0);
INSERT INTO `posts` VALUES (49, 'Pietro Longhi', 'c8fy0ay8kehj4gdw1598818280180pietro-longhi.jpg!Portrait.jpg', 5, 0, '', '', 0);
INSERT INTO `posts` VALUES (50, 'Thomas Gainsborough', 'c8fy0ay8kehj5wsj1598818348099download (3).jpg', 5, 0, '', '', 0);
INSERT INTO `posts` VALUES (51, 'Joshua Reynolds', 'c8fy0ay8kehj6xgd1598818395613H0046-L00681402.jpg', 5, 0, '', '', 0);
INSERT INTO `posts` VALUES (52, 'Anton Raphael Mengs', 'c8fy0ay8kehj9c3a1598818507894Anton Raphael Mengs Saint john the baptist.jpg', 10, 0, '', '', 0);
INSERT INTO `posts` VALUES (53, 'Jean Honoré Fragonard', 'c8fy0ay8kehjagxc1598818560816Jean-Honoré_Fragonard_-_Blind-Man’s_Buff_-_Google_Art_Project.jpg', 10, 0, '', '', 0);
INSERT INTO `posts` VALUES (54, 'Utamaro', 'c8fy0ay8kehjbtou1598818624014674px-Ase_o_fuku_onna2.jpg', 10, 0, '', '', 0);
INSERT INTO `posts` VALUES (55, 'Francisco Goya', 'c8fy0ay8kehjddnw159881869655795-primary-0-nativeres.ptif.jpg', 10, 0, '', '', 0);
INSERT INTO `posts` VALUES (60, 'David Teniers;', 'c8fy0ay8kehjmxjc1598819142216download (5).jpg', 3, 0, '', '', 0);
INSERT INTO `posts` VALUES (61, 'Bartolomé Esteban Murillo', 'c8fy0ay8kehjo63e1598819199962madonna-immakulata-murilio+.jpg', 3, 0, '', '', 0);
INSERT INTO `posts` VALUES (62, 'Salvator Rosa', 'c8fy0ay8kehjpm741598819267488Self-portrait_by_Salvator_Rosa.jpg', 3, 0, '', '', 0);
INSERT INTO `posts` VALUES (63, 'Jean-Antoine Watteau', 'c8fy0ay8kehjrew31598819351331download (6).jpg', 3, 0, '', '', 0);
INSERT INTO `posts` VALUES (64, 'Rembrandt Harmenszoon van Rijn', 'c8fy0ay8kehju54m1598819478646download (7).jpg', 6, 0, '', '', 0);
INSERT INTO `posts` VALUES (65, 'Canaletto', 'c8fy0ay8kehjvgx01598819540580images.jpg', 6, 0, '', '', 0);
INSERT INTO `posts` VALUES (66, 'Christopher Scardino', 'c8fy0ay8kehjwmcj15988195942752930182-TPXQCVFM-7.jpg', 6, 0, '', '', 0);
INSERT INTO `posts` VALUES (67, 'William Hogarth', 'c8fy0ay8kehjxlu21598819640266download (8).jpg', 6, 0, '', '', 0);
INSERT INTO `posts` VALUES (68, 'Niko Pirosmani', 'c8fy0ay8kehjzaeq1598819718770download (9).jpg', 7, 0, '', '', 0);
INSERT INTO `posts` VALUES (69, 'John Singer Sargent', 'c8fy0ay8kehk09ri1598819764591download (10).jpg', 7, 0, '', '', 0);
INSERT INTO `posts` VALUES (70, 'Stasys Krasauskas', 'c8fy0ay8kehk5f8p1598820004969images (1).jpg', 7, 0, '', '', 0);
INSERT INTO `posts` VALUES (71, 'Egon Schiele', 'c8fy0ay8kehk6jko1598820057240Egon_schiele-portrait_of_the_actress_marge_boerne.jpg', 7, 0, '', '', 0);
INSERT INTO `posts` VALUES (72, 'Edvard Munch', 'c8fy0ay8kehklcfs1598820747832Edvard_munch-despair.jpg', 11, 0, '', '', 0);
INSERT INTO `posts` VALUES (73, 'Pierre Bonnard', 'c8fy0ay8kehk9zb21598820217598a4466ec5261cca0ae40e99f48938ce98--art-pierre-pierre-bonnard.jpg', 11, 0, '', '', 0);
INSERT INTO `posts` VALUES (74, 'Leon Tutunjyan', 'c8fy0ay8kehkc0wk159882031298039.jpg', 11, 0, '', '', 0);
INSERT INTO `posts` VALUES (75, 'Salvador Dalí', 'c8fy0ay8kehkctjx1598820350109------------------------------------1941---------------------------_1459249121465385.jpg', 11, 0, '', '', 0);
INSERT INTO `posts` VALUES (76, 'Corinne Hartley', 'c8fy0ay8kehkg0oc1598820499308df566ed9023cf8e25c8e561319ce0280.jpg', 17, 0, '', '', 0);
INSERT INTO `posts` VALUES (77, 'Kazimir Malevich', 'c8fy0ay8kehkh8tm159882055652242ec8f7a427deb15e7f56a307654dd52--cubism-modern-art.jpg', 17, 0, '', '', 0);
INSERT INTO `posts` VALUES (78, 'Fernand Léger', 'c8fy0ay8kehkim5c15988206204483bcaacec0b03108693ab11baecb630d6--fernand-leger-modern-artists.jpg', 17, 0, '', '', 0);
INSERT INTO `posts` VALUES (79, 'Fernand Leger', 'c8fy0ay8kehl27q11598821534873b14f2521ec49fdab4ae9876a6031e36d.jpg', 17, 0, '', '', 0);
INSERT INTO `posts` VALUES (80, 'Fernand Leger', 'c8fy0ay8kehl27q11598821534873b14f2521ec49fdab4ae9876a6031e36d.jpg', 16, 0, '', '', 0);
INSERT INTO `posts` VALUES (81, 'George Wesley Bellows', 'c8fy0ay8kehl5nig1598821695304tumblr_o7gbcq3H1q1s5098to1_1280.jpg', 16, 0, '', '', 0);
INSERT INTO `posts` VALUES (82, 'Paolo Veronese', 'c8fy0ay8kehl7xw515988218020699ee47ebbd78c2667545207f6232bcfdb.jpg', 16, 0, '', '', 0);
INSERT INTO `posts` VALUES (83, 'Pieter Bruegel', 'c8fy0ay8kehl95981598821858268s1200.jpg', 16, 0, '', '', 0);

-- ----------------------------
-- Table structure for requests
-- ----------------------------
DROP TABLE IF EXISTS `requests`;
CREATE TABLE `requests`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user1` int(11) NULL DEFAULT NULL,
  `user2` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user1`(`user1`) USING BTREE,
  INDEX `user2`(`user2`) USING BTREE,
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of requests
-- ----------------------------
INSERT INTO `requests` VALUES (2, 1, 13);
INSERT INTO `requests` VALUES (3, 2, 13);
INSERT INTO `requests` VALUES (4, 3, 13);
INSERT INTO `requests` VALUES (5, 4, 13);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `surname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `login` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `token` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `active_time` int(155) NULL DEFAULT NULL,
  `cover_photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `cover_photo1` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `block_count` int(11) NULL DEFAULT 0,
  `block_time` int(155) NULL DEFAULT NULL,
  `type` int(11) NULL DEFAULT 0,
  `block_status` int(11) NULL DEFAULT 1,
  `verification_satus` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Ashxen ', 'Verdyan', 'z@mail.ru', '$2b$10$JuC4rbKlqarK0vxDUig0BeyMX7nhxXcU3oGXHMDKmKaGF1vAI/DJm', 'c8fy0cs8ke05khd51597767588329Ashxen.jpg\r\n', 'c8fy09nkkd7pi85m', 1596047556, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (2, 'Mary', 'Minasyan', 'rrr@mail.ru', '$2b$10$OvIi39Y5XwkXkojHbP/LN.KBrzG8X9qUTzI6/aqF.kScfw5HSLz7S', 'c8fy0cs8ke05p2721597767801950girl-avatar-cartoon-stock-vector-image-cute-beautiful-eyes-93364804.jpg', '', 0, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (3, 'Hermine', 'Hakobyan', 's@mail.ru', '$2b$10$AMfgOM6g9WuEPAYLEv3cpedoLZ2aOvIiqtEhbVuW4qBpsKDm3ychm', 'c8fy0cs8ke05qtec1597767883860images.jpg', 'c8fy0m8kd7vo3jq', NULL, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (4, 'Arpine', 'Sargsyan', 'd@mail.ru', '$2b$10$j.AolOUQ.VNY6eJ1PSCiyOTVRHcEaom4eQjz9Fb69MHG75fDnnS1K', 'c8fy0cs8ke03u0371597764673267girl_female_woman_avatar-512.png', 'c8fy0f9wkeg53o2h', 1598734262, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (5, 'Marianna', 'Gevorgyan', 'dr@mail.ru', '$2b$10$Pw5gz3p4WnCwauy8nyyBcOkhEugTvIFLqL0j8Jku6du2MpukJFB8y', 'c8fy0cs8ke03wdz61597764784578download.png', '', 0, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (6, 'Hakob', 'Vardanyan', 'AAA@mail.ru', '$2b$10$Zr95.Gmo26ssrq.jk7Mb2.LD5cHB3AvPJeVEgZlp7aeEs91jemlj.', 'c8fy0cs8ke03hsv4159776410403251f6fb256629fc755b8870c801092942.png', 'c8fy06d8kd7wn5au', NULL, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (7, 'Hexush', 'Surenyan', 'f@mail.ru', '$2b$10$Pn6U6Wp.Vy1kAmckPLGgmerZuqUzJjBGpouOUPdRfTddSkZuI6YNe', 'c8fy0cs8ke03yjub1597764885491039_girl_avatar_profile_woman_headband-512 (1).png', 'c8fy06d8kd7wox1p', NULL, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (8, 'Aida', 'Galoyan', 'zf@mail.ru', '$2b$10$KBs3ScBXM5Z520ucD0P87OoXHptnD5wxRTJlRkXh.Dvt/9ESNWiHq', 'c8fy0cs8ke054nqp1597766850097smiling-girl-avatar_102172-32.jpg', 'c8fy0avwkd7x3rk0', 1596060318, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (9, 'Arman', 'Verdyan', 'l15@mail.ru', 'asdfAS!@124', 'c8fy0cs8ke052j011597766750641oscar_boy-512.png', 'c8fy0cw8kdfv2ogy', 1596540638, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (10, 'Minas', 'Minasyan', 'rt@mail.ru', '$2b$10$FE.9tTTaDeJLRisKYvZt9uw5gj6u588x5kbiwnS.m/unfGWvazpFG', 'c8fy0cs8ke05608x1597766912961cool-avatar-transparent-image-cool-boy-avatar-11562893383qsirclznyw.png', 'c8fy09kgkddj6ydq', NULL, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (11, 'Hayk', 'Hovhannisyan', 'x@mail.ru', '$2b$10$VibEQvVIhXxAsoeSblPQluql94a1QY7FoR965HqjPiX2.wFlWCH8y', 'c8fy0cs8ke059p10159776708504491-512.png', 'c8fy0fbskdf1av2z', NULL, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (12, 'Armen', 'Verdyan', 'l13@mail.ru', '$2b$10$mVn.cTE6Nf1akaBSGWhZpuFSRyAIHfOjeQBNM12QTwgFsU0wU/VAC', 'c8fy0cs8ke05b1yl1597767148461download0.png', 'c8fy0bf0kdfvpi5i', 1596541702, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (13, 'Anahit', 'Verdyan', 'l35@mail.ru', '$2b$10$kKJP9wh/iLk9Xl1Dv6L.4e662HIs9xbPBXJ.hMv8g2o3xlL6XLnKu', 'ud0uh3qwkgcc49t11602857748133c8fy0cs8ke05ryur1597767937587Anahit.png', 'ud0uh8twkhel652b', 1605170666, 'c8fy07xskebap7s2159844133520211.png', 'c8fy07xskebasygz159844150976312.jpg', 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (14, 'Ani', 'Samsonyan', 'rtr@mail.ru', '$2b$10$Jk/s70gJfcnQS7xofojWleiMaOdPcsfSoVMUHl2OxuSa/OYYUlJEe', 'c8fy0cs8ke05cjiz1597767217884cute-vector-girl-avatar-icon-happy-woman-red-lips-pretty-cute-vector-girl-avatar-icon-happy-woman-red-lips-pretty-lady-108313736.jpg', 'ud0uh7ewkgkemkua', 1603345690, NULL, NULL, 0, 0, 1, 1, 1);
INSERT INTO `users` VALUES (15, 'Aram', 'Hakobyan', 'ar@mail.ru', '$2b$10$tNtZztpyYUyZMm8LJWHLUOYFwvXJlSDRXQzXTkmdcG0rMExdHBnuC', 'c8fy0cs8ke05dqqm1597767273886Boy-Avatar-Transparent-Images.png', '', 0, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (16, 'Serine', 'Avagyan', 'qw@mail.ru', '$2b$10$2nDKx5e0U9AdWStCERXpjOPLyoCyF5CTF3wiDf.ddtTCj7KFRTmay', 'c8fy0cs8ke05f4j71597767338419woman-girl-female-cartoon-avatar-icon_25030-13347.jpg', 'c8fy0ihckdj8ggnl', 1596744514, NULL, NULL, 0, 0, 0, 1, 1);
INSERT INTO `users` VALUES (17, 'Dina', 'Harutyunyan', 'ddt@mail.ru', '$2b$10$6Wssuo66.nhfZLyChLo4DeN0jWWDZb4dwJS/i.8QfcSMzJ.intm6.', 'c8fy0cs8ke05gv5u1597767419586downloadgg.png', '', 0, NULL, NULL, 0, 0, 0, 1, 1);

SET FOREIGN_KEY_CHECKS = 1;
