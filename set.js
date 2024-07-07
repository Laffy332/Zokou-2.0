const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZkK0VTODBySGdIQmdaTlZLM1JuSitlZ2lLUFBxbnpoQUhHZXl0N1NuQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNThUK202SUF5QlE2dlFaZ0ZoWnhpZVNpdnVzMndySFhEK2ZaaFlxcXpTND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlRzdDSTJTVzdDbjhxNERraGJTYXJHVlBhQktPSldsL3VTM3F5bmcyQlZVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLMjQ2dDMyZXRwOW04SWxmWWl3cGxHcGZlcy9HbCtvRXozUWFURjRUL3lFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVKTG5QdlpjcG9SK1FSM0tVampGVk50UDJZWVhjRWoyenVua0V4SWtzVWM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkF3aE1yK1NHZVBIdEdJKzA3ZnY3MTZhVVRUeXFxVWZLTlo1dEtTdUdHMHM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUd1emRGb3FmNGRYMHYzcGpUenVXK1dUUXdXMmlpNVh3YUltQ3JlMmJXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3lQcWxncm00amJwTDlleHg0SW5BZFQyODRXRXhpVnpOcUZxMzRuRnduUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkZDMG9TMjJVNWh5MVVRYzlocW4xN25nRHdqWStHTEU4NG5mN0luVXUxNWFUUCtRN0lhQ1NhZ3ZrVFBsaFlBQzhBNzhTRm9TZTlUcmdaelBlNGh6NGd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzYsImFkdlNlY3JldEtleSI6InZxU2RFS2wwbFVBTldLMXNRQkNJTGFsblo4UnJ6dW9QeGticU9hY3ZOQm89IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjJtaENjYzFsUThHc0psRDJvRFJjbkEiLCJwaG9uZUlkIjoiYTkwN2YzOWQtMzlhZi00Y2U5LTgxZTItOGU3NTc2MjcxZTQ5IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikpibm0zUWRwV2MyNHZYWXFRSDlzYitlVzVQST0ifSwicmVnaXN0ZXJlZCI6ZmFsc2UsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUNuQ05LN3ZUbnRZcytUN3JYZHJOUUtWTExRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS3I4eVp3T0VKbmxxN1FHR0JVZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZmVzNHREbS9manZWa3QvazlJaExNbzZSYndlY1laZ0l5cS9PYXJoOFJuYz0iLCJhY2NvdW50U2lnbmF0dXJlIjoid1F5L1Z6SGdTYzFUVllLb3U3czJGd2J5NTZibVR3U3BrRVpPamFFWFhacUhtUkJxMncrMWRnQk9QdmNvSDJuMmJGbUdGc0h1U2ZQQW1tVW5OL2pQZ0E9PSIsImRldmljZVNpZ25hdHVyZSI6Ilp1dW9yVEpqbmNjSGFudjN1RFFXRDJtbWtkTzVqSFJmZTJxZm1DK1IyT01aSXhEWDdzclIvaXA1UmxVbkRDbnU4TTBzZjB3MXdGSDRydk9udWJ0bGlBPT0ifSwibWUiOnsiaWQiOiIyMzc2Nzg5Njg2Mzg6MzNAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiWm9rb3UtTUQiLCJsaWQiOiIyMjQ5NDQ3NjgxNjM4NTM6MzNAbGlkIn0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNzY3ODk2ODYzODozM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYM3JPTFE1djM0NzFaTGY1UFNJU3pLT2tXOEhuR0dZQ01xdnptcTRmRVozIn19XSwicGxhdGZvcm0iOiJzbWJpIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQVVJQWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjAzODIxMDgsImxhc3RQcm9wSGFzaCI6IjFsT1NFSSIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUDh5In0=',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PRIVE,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
