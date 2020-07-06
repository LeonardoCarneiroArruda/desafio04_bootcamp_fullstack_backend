import mongoose from 'mongoose';


 //criacao do modelo referente a colecao la no banco de dados 
 const studentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        validate(value) {
            if(value < 0)
                throw new Error("Valor de nota negativo nao permitido");
        }
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

//relacionar a colecao com o schema modelo criado
const studentModel = mongoose.model('student', studentSchema, 'student');

export {studentModel};