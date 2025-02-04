import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { collection, getDocs, doc, setDoc, where, query } from 'firebase/firestore';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export async function register(req, res, firestoreDB) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    try {
        const usersRef = collection(firestoreDB, "users");
        const q = query(usersRef, where("email", "==", email));
        const existingUser = await getDocs(q);

        if (!existingUser.empty) {
            return res.status(400).json({ error: "Email is already used!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserRef = doc(usersRef);
        await setDoc(newUserRef, {
            username,
            email,
            password: hashedPassword,
            cartItems: []
        });

        const jwtToken = jwt.sign({ uid: newUserRef.id, email }, JWT_SECRET, { expiresIn: "1h" });

        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            maxAge:  60 * 60 * 1000
        });

        res.send({ message: "User registered successfully" });
    } catch (error) {
        console.error("🔥 Register Error:", error);
        res.status(500).send({ error: "Register Error" });
    }
}

export async function login(req, res, firestoreDB) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send({ error: "All fields are required!" });
    }

    try {
        const usersRef = collection(firestoreDB, "users");
        const q = query(usersRef, where("email", "==", email));
        const existingUser = await getDocs(q);

        if (existingUser.empty) {
            return res.status(404).send({ error: `No account with email: ${email}` });
        }

        const userDoc = existingUser.docs[0];
        const userData = userDoc.data();

        const passwordMatch = await bcrypt.compare(password, userData.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: "Invalid credentials!" });
        }

        const jwtToken = jwt.sign(
            { uid: userDoc.id, email: userData.email },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.cookie('jwt', jwtToken, {
            httpOnly: true,
            maxAge:  60 * 60 * 1000 
        });

        res.send({ message: "Login successful!" });

    } catch (error) {
        console.error("🔥 Login Error:", error);
        res.status(500).send({ error: "Login Error" });
    }
}

export async function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 0 });
    res.send({ message: "Logged out successfully!" });
}

export async function getUser(req, res, firestoreDB) {
    try {
        const cookie = req.cookies['jwt'];

        if (!cookie) {
            return res.status(401).send({ message: "Unauthenticated" });
        }

        const claims = jwt.verify(cookie, JWT_SECRET);

        const usersRef = collection(firestoreDB, "users");
        const q = query(usersRef, where("__name__", "==", claims.uid));
        const userSnapshot = await getDocs(q);

        if (userSnapshot.empty) {
            return res.status(404).send({ message: "User not found" });
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();

        res.send({
            username: userData.username,
            email: userData.email,
            cartItems: userData.cartItems
        });

    } catch (error) {
        console.error("🔥 User Fetch Error:", error);
        res.status(401).send({ message: "Unauthenticated" });
    }
}
