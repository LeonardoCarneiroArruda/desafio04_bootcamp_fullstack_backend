import {studentModel} from '../models/studentModel.js';
import { logger } from '../config/logger.js';

const create = async (req, res) => {
  try {

    const student = new studentModel(req.body);
    await student.save();

    res.send(student);
    logger.info(`POST /grade - ${JSON.stringify(student)}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Algum erro ocorreu ao salvar' });
    logger.error(`POST /grade - ${JSON.stringify(error.message)}`);
  }
};

const findAll = async (req, res) => {
  //const name = req.query.name;

  //condicao para o filtro no findAll
  //var condition = name
   // ? { name: { $regex: new RegExp(name), $options: 'i' } }
   // : {};

  try {
    const student = await studentModel.find({});
    res.send(student);
    logger.info(`GET /grade`);
  } catch (error) {
    res
      .status(500)
      .send({ message: error.message || 'Erro ao listar todos os documentos' });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await studentModel.findOne({"_id": id});
    res.send(student);

    logger.info(`GET /grade - ${id}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao buscar o Grade id: ' + id });
    logger.error(`GET /grade - ${JSON.stringify(error.message)}`);
  }
};

const update = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: 'Dados para atualizacao vazio',
    });
  }

  const id = req.params.id;

  try {
    const student = await studentModel.findOneAndUpdate({"_id":id},
                                                        req.body,
                                                        {new: true});
    if (student) {
      res.send({ message: 'Grade atualizado com sucesso' });  
    }          
    
    res.status(400).send();

    logger.info(`PUT /grade - ${id} - ${JSON.stringify(req.body)}`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao atualizar a Grade id: ' + id });
    logger.error(`PUT /grade - ${JSON.stringify(error.message)}`);
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  try {
    const student = await studentModel.findOneAndDelete({"_id": id});

    if (student)
      res.send({ message: 'Grade excluido com sucesso' });
    else 
      response.status(404).send("Documento nao encontrado");

    logger.info(`DELETE /grade - ${id}`);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Nao foi possivel deletar o Grade id: ' + id });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

const removeAll = async (req, res) => {

  try {
    await studentModel.remove({});
    res.send({
      message: `Grades excluidos`,
    });
    logger.info(`DELETE /grade`);
  } catch (error) {
    res.status(500).send({ message: 'Erro ao excluir todos as Grades' });
    logger.error(`DELETE /grade - ${JSON.stringify(error.message)}`);
  }
};

export default { create, findAll, findOne, update, remove, removeAll };
