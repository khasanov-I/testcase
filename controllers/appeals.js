const Appeal = require('../models/appeal');
const {Sequelize} = require("sequelize")

exports.createAppel = (req, res, next) => {
  const topic = req.body.topic;
  const text = req.body.text;
  Appeal.create({
    topic: topic,
    appeal_text: text,
    appeal_status: "Created"
  })
    .then(result => {
      console.log('Created Appeal');
      res.status(201).json({
        message: 'Appeal created successfully!',
        appeal: result
      });
    })
    .catch(err => {
      console.log(err);
    }); 
}

exports.takeAppeal = (req, res, next) => {
  const id = req.params.id;
  Appeal.findByPk(id)
    .then(appeal => {
      if (!appeal) {
        return res.status(404).json({ message: 'Appeal not found!' });
      }
      appeal.appeal_status = "Pending";
      return appeal.save();
    })
    .then(result => {
      res.status(200).json({message: "Appeal's status changed from Created to Pending", appeal: result});
    })
    .catch(err => console.log(err));
}

exports.resolveAppeal = (req, res, next) => {
    const id = req.params.id;
    const resolve_text = req.body.text
    Appeal.findByPk(id)
      .then(appeal => {
        if (!appeal) {
          return res.status(404).json({ message: 'Appeal not found!' });
        }
        appeal.appeal_status = "Resolved";
        appeal.resolve_text = resolve_text
        return appeal.save();
      })
      .then(result => {
        res.status(200).json({message: 'Appeal resolved!', appeal: result});
      })
      .catch(err => console.log(err));
}

exports.rejectAppeal = (req, res, next) => {
    const id = req.params.id;
    const reject_reason = req.body.reason
    Appeal.findByPk(id)
      .then(appeal => {
        if (!appeal) {
          return res.status(404).json({ message: 'Appeal not found!' });
        }
        appeal.appeal_status = "Rejected";
        appeal.reject_reason = reject_reason
        return appeal.save();
      })
      .then(result => {
        res.status(200).json({message: 'Appeal rejected!', appeal: result});
      })
      .catch(err => console.log(err));
}

exports.findAppealsByDate = (req, res, next) => {
    const left = req.query.first;
    const right = req.query.second;
    const Op = Sequelize.Op;
    Appeal.findAll({where: {
        createdAt: {
            [Op.between]: [`${left}T00:00:00.000Z`, `${right ? right : left}T23:59:59.999Z`]
        }
    }})
      .then(appeals => {
        if (appeals.length === 0) {
          return res.status(404).json({ message: 'Appeals not found!' });
        }
        return appeals
      })
      .then(result => {
        res.status(200).json({message: "Result: ", appeal: result});
      })
      .catch(err => console.log(err));
}

exports.rejectAppeals = (req, res, next) => {
    const reject_reason = req.body.reason
    Appeal.update({
        appeal_status: "Rejected",
        reject_reason: reject_reason
    }, 
    {    
        where: {
            appeal_status: "Pending"
        },
        returning: true
    })
      .then(result => {
        res.status(200).json({message: `Appeals rejected: ${result[0]}`, appeals: result[1]});
      })
      .catch(err => {
        console.log(err)
        res.status(404).json({message: 'Appeals with status pending not found'})
    });
}