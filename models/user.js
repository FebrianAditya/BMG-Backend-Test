'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Username REQUIRED"
        },
        isAlphanumeric: {
          args: true,
          msg: "PLease input ALPHANUMERIC"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password REQUIRED"
        },
        isAlphanumeric: {
          args: true,
          msg: "Please input ALPHANUMERIC"
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name REQUIRED"
        },
        isAlphanumeric: {
          args: true,
          msg: "Please input ALPHANUMERIC"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email REQUIRED"
        },
        isEmail: {
          args: true,
          msg: "please input with format email (foo@bar.com)"
        }
      }
    },
    referralCode: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric: {
          args: true,
          msg: "Input ALPHANUMERIC"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.addHook("beforeCreate", (instance, option) => {
    let salt = bcrypt.genSaltSync(Number(process.env.HASH))
    let hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })

  return User;
};