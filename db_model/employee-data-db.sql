-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema employeedb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema employeedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `employeedb` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `employeedb` ;

-- -----------------------------------------------------
-- Table `employeedb`.`department`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeedb`.`department` (
  `id_department` INT NOT NULL AUTO_INCREMENT,
  `department_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_department`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeedb`.`position`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeedb`.`position` (
  `id_position` INT NOT NULL AUTO_INCREMENT,
  `position_name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_position`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeedb`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeedb`.`roles` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_role`))
ENGINE = InnoDB
AUTO_INCREMENT = 5
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeedb`.`user_data`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeedb`.`user_data` (
  `id_user_data` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `address` VARCHAR(45) NULL DEFAULT NULL,
  `department_id_department` INT NOT NULL,
  `position_id_position` INT NOT NULL,
  `salary` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id_user_data`),
  INDEX `fk_user_data_department1_idx` (`department_id_department` ASC) VISIBLE,
  INDEX `fk_user_data_position1_idx` (`position_id_position` ASC) VISIBLE,
  CONSTRAINT `fk_user_data_department1`
    FOREIGN KEY (`department_id_department`)
    REFERENCES `employeedb`.`department` (`id_department`),
  CONSTRAINT `fk_user_data_position1`
    FOREIGN KEY (`position_id_position`)
    REFERENCES `employeedb`.`position` (`id_position`))
ENGINE = InnoDB
AUTO_INCREMENT = 35
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `employeedb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `employeedb`.`users` (
  `id_users` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  `roles_id_role` INT NOT NULL,
  PRIMARY KEY (`id_users`),
  INDEX `fk_users_roles1_idx` (`roles_id_role` ASC) VISIBLE,
  CONSTRAINT `fk_users_roles1`
    FOREIGN KEY (`roles_id_role`)
    REFERENCES `employeedb`.`roles` (`id_role`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
