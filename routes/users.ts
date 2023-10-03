import express from 'express';
import {collections} from "../services/database.services";
import Cobros from "../models/Cobros";

const router = express.Router();

/**
 * Para obtener los datos de cobros
 */
router.get('/', async function (req, res, next) {
    try {
        // @ts-ignore
        const cobros = (await collections.cobros.find({}).toArray()) as Cobros[];

        res.status(200).send(cobros);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

/**
 * Para añadir cobros al cliente o crear un nuevo cliente y añadir un cobro para el
 */
router.post('/', async function (req, res, next) {
    try {
        // @ts-ignore
        const {
            nombre,
            valor,
            cliente,
        } = req.body;

        if (!nombre || nombre.length < 2) {
            res.status(422).send({error: "Nombre necesita tener más que dos letras"})
            return
        }
        if (!valor || valor <= 0) {
            res.status(422).send({error: "Valor no puede ser igual o menor que zero"});
            return
        }

        let result

        let cobroDatos: Cobros = {nombre, valor: [valor], codigo: cliente}

        if (cliente) {
            result = await collections.cobros?.updateOne(
                {codigo: cliente},
                {$push: {valor}}
            );
        } else {
            cobroDatos.codigo = "NREV" + Math.floor(Math.random() * 9999)
            result = await collections.cobros?.insertOne(cobroDatos);
        }


        res.status(200).send(result);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router;
