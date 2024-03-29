import { Router } from 'express';
import * as userController from '../controllers/user.controller.js';
import { findByEmail } from '../controllers/session.controller.js';
import passport from 'passport';

const router = Router();

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

router.post("/register", userController.addUser);

router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al destruir la sesión:', err);
            next(err); // pasa el error al middleware de manejo de errores
        } else {
            res.clearCookie('connect.sid', { path: '/' }); // Asegúrate de que el nombre de la cookie coincida con tu configuración
            res.redirect("/");
        }
    });
});

router.get("/auth/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get("/auth/github/callback", passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/login"
}));

export default router;