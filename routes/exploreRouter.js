const express = require('express');
const bodyParser = require("body-parser");
const { patientModel } = require('../model/Patient');
const router = express.Router();
router.use(bodyParser.json());


//Users Registration Route
router.route("/")
    .get((req,res,next)=>{
        res.setHeader("Content-Type","application/json")
            patientModel.findById({_id:req.body.id}).then((patient)=>{
                st = ""
                for(p of patient.disease_history){
                    st += p.name+" "
                }
                st = st.toLowerCase();
                rec = initializeBayes(st)   
                res.send({
                    code : 200,
                    msg:"Succesfully get a doctor's Recommendation",
                    data : rec
                })
            }).catch((err)=>{
                console.log(err);
                res.send({
                    code : 400,
                    msg:"Error : "+err._message,
                    data : null
                })
            })
    })

function initializeBayes(param) {
    var natural = require('natural');
    var classifier = new natural.BayesClassifier();
    classifier.addDocument(" ginekolog psikiater tht "," 5fdd025040c9250d2c7d6d73 ");
    classifier.addDocument(" mata pulmonolog onkologi "," 5fdd025140c9250d2c7d6d75 ");
    classifier.addDocument(" psikiater kardiolog ortopedi "," 5fdd025140c9250d2c7d6d77 ");
    classifier.addDocument(" audiolog anak radiolog "," 5fdd025240c9250d2c7d6d79 ");
    classifier.addDocument(" onkologi anak tht "," 5fdd025340c9250d2c7d6d7b ");
    classifier.addDocument(" anak audiolog mata "," 5fdd025340c9250d2c7d6d7d ");
    classifier.addDocument(" jantung audiolog gigi "," 5fdd025440c9250d2c7d6d7f ");
    classifier.addDocument(" tht ginekolog onkologi "," 5fdd025440c9250d2c7d6d81 ");
    classifier.addDocument(" mata gigi endokrinologi "," 5fdd025540c9250d2c7d6d83 ");
    classifier.addDocument(" radiolog gigi anak "," 5fdd025540c9250d2c7d6d85 ");
    classifier.addDocument(" radiolog pulmonolog psikiater "," 5fdd025640c9250d2c7d6d87 ");
    classifier.addDocument(" ginekolog endokrinologi tht "," 5fdd025640c9250d2c7d6d89 ");
    classifier.addDocument(" jantung kardiolog gigi "," 5fdd025640c9250d2c7d6d8b ");
    classifier.addDocument(" ginekolog anak gigi "," 5fdd025740c9250d2c7d6d8d ");
    classifier.addDocument(" jantung endokrinologi psikiater "," 5fdd025740c9250d2c7d6d8f ");
    classifier.addDocument(" kardiolog ortopedi endokrinologi "," 5fdd025840c9250d2c7d6d91 ");
    classifier.addDocument(" radiolog pulmonolog ortopedi "," 5fdd025840c9250d2c7d6d93 ");
    classifier.addDocument(" psikiater mata anak "," 5fdd025940c9250d2c7d6d95 ");
    classifier.addDocument(" audiolog tht saraf "," 5fdd025940c9250d2c7d6d97 ");
    classifier.addDocument(" saraf mata audiolog "," 5fdd025a40c9250d2c7d6d99 ");
    classifier.addDocument(" radiolog kardiolog onkologi "," 5fdd025a40c9250d2c7d6d9b ");
    classifier.addDocument(" mata anak gigi "," 5fdd025b40c9250d2c7d6d9d ");
    classifier.addDocument(" audiolog pulmonolog jantung "," 5fdd025b40c9250d2c7d6d9f ");
    classifier.addDocument(" ginekolog radiolog pulmonolog "," 5fdd025c40c9250d2c7d6da1 ");
    classifier.addDocument(" mata ortopedi ginekolog "," 5fdd025c40c9250d2c7d6da3 ");
    classifier.addDocument(" jantung onkologi endokrinologi "," 5fdd025c40c9250d2c7d6da5 ");
    classifier.addDocument(" anak kardiolog audiolog "," 5fdd025d40c9250d2c7d6da7 ");
    classifier.addDocument(" jantung mata saraf "," 5fdd025d40c9250d2c7d6da9 ");
    classifier.addDocument(" gigi pulmonolog jantung "," 5fdd025e40c9250d2c7d6dab ");
    classifier.addDocument(" onkologi psikiater audiolog "," 5fdd025e40c9250d2c7d6dad ");
    classifier.addDocument(" audiolog pulmonolog psikiater "," 5fdd025f40c9250d2c7d6daf ");
    classifier.addDocument(" anak audiolog radiolog "," 5fdd025f40c9250d2c7d6db1 ");
    classifier.addDocument(" anak onkologi ginekolog "," 5fdd026040c9250d2c7d6db3 ");
    classifier.addDocument(" pulmonolog psikiater onkologi "," 5fdd026040c9250d2c7d6db5 ");
    classifier.addDocument(" kardiolog psikiater audiolog "," 5fdd026140c9250d2c7d6db7 ");
    classifier.addDocument(" tht onkologi kardiolog "," 5fdd026140c9250d2c7d6db9 ");
    classifier.addDocument(" ortopedi onkologi saraf "," 5fdd026140c9250d2c7d6dbb ");
    classifier.addDocument(" gigi mata onkologi "," 5fdd026240c9250d2c7d6dbd ");
    classifier.addDocument(" anak kardiolog ginekolog "," 5fdd026240c9250d2c7d6dbf ");
    classifier.addDocument(" tht onkologi kardiolog "," 5fdd026340c9250d2c7d6dc1 ");
    classifier.addDocument(" psikiater saraf endokrinologi "," 5fdd026340c9250d2c7d6dc3 ");
    classifier.addDocument(" onkologi mata endokrinologi "," 5fdd026440c9250d2c7d6dc5 ");
    classifier.addDocument(" mata gigi ortopedi "," 5fdd026440c9250d2c7d6dc7 ");
    classifier.addDocument(" tht saraf kardiolog "," 5fdd026540c9250d2c7d6dc9 ");
    classifier.addDocument(" kardiolog radiolog mata "," 5fdd026540c9250d2c7d6dcb ");
    classifier.addDocument(" tht radiolog kardiolog "," 5fdd026640c9250d2c7d6dcd ");
    classifier.addDocument(" pulmonolog radiolog ortopedi "," 5fdd026640c9250d2c7d6dcf ");
    classifier.addDocument(" endokrinologi radiolog ginekolog "," 5fdd026640c9250d2c7d6dd1 ");
    classifier.addDocument(" psikiater onkologi radiolog "," 5fdd026740c9250d2c7d6dd3 ");
    classifier.addDocument(" onkologi tht kardiolog "," 5fdd026740c9250d2c7d6dd5 ");
    classifier.addDocument(" endokrinologi anak tht "," 5fdd026840c9250d2c7d6dd7 ");
    classifier.addDocument(" mata psikiater pulmonolog "," 5fdd026840c9250d2c7d6dd9 ");
    classifier.addDocument(" jantung audiolog radiolog "," 5fdd026940c9250d2c7d6ddb ");
    classifier.addDocument(" audiolog ortopedi saraf "," 5fdd026940c9250d2c7d6ddd ");
    classifier.addDocument(" ginekolog onkologi radiolog "," 5fdd026a40c9250d2c7d6ddf ");
    classifier.addDocument(" endokrinologi audiolog ortopedi "," 5fdd026a40c9250d2c7d6de1 ");
    classifier.addDocument(" anak jantung ortopedi "," 5fdd026b40c9250d2c7d6de3 ");
    classifier.addDocument(" radiolog psikiater jantung "," 5fdd026b40c9250d2c7d6de5 ");
    classifier.addDocument(" ortopedi radiolog kardiolog "," 5fdd026c40c9250d2c7d6de7 ");
    classifier.addDocument(" mata ginekolog psikiater "," 5fdd026c40c9250d2c7d6de9 ");
    classifier.addDocument(" ortopedi tht onkologi "," 5fdd026c40c9250d2c7d6deb ");
    classifier.addDocument(" tht psikiater kardiolog "," 5fdd026d40c9250d2c7d6ded ");
    classifier.addDocument(" audiolog pulmonolog mata "," 5fdd026d40c9250d2c7d6def ");
    classifier.addDocument(" kardiolog onkologi pulmonolog "," 5fdd026e40c9250d2c7d6df1 ");
    classifier.addDocument(" ginekolog endokrinologi psikiater "," 5fdd026e40c9250d2c7d6df3 ");
    classifier.addDocument(" pulmonolog mata ortopedi "," 5fdd026f40c9250d2c7d6df5 ");
    classifier.addDocument(" anak mata pulmonolog "," 5fdd026f40c9250d2c7d6df7 ");
    classifier.addDocument(" ortopedi mata psikiater "," 5fdd027040c9250d2c7d6df9 ");
    classifier.addDocument(" ginekolog ortopedi radiolog "," 5fdd027040c9250d2c7d6dfb ");
    classifier.addDocument(" audiolog saraf tht "," 5fdd027140c9250d2c7d6dfd ");
    classifier.addDocument(" anak ginekolog ortopedi "," 5fdd027140c9250d2c7d6dff ");
    classifier.addDocument(" saraf audiolog ortopedi "," 5fdd027140c9250d2c7d6e01 ");
    classifier.addDocument(" jantung tht kardiolog "," 5fdd027240c9250d2c7d6e03 ");
    classifier.addDocument(" audiolog psikiater ortopedi "," 5fdd027240c9250d2c7d6e05 ");
    classifier.addDocument(" psikiater endokrinologi tht "," 5fdd027340c9250d2c7d6e07 ");
    classifier.addDocument(" gigi kardiolog onkologi "," 5fdd027340c9250d2c7d6e09 ");
    classifier.addDocument(" gigi ortopedi tht "," 5fdd027440c9250d2c7d6e0b ");
    classifier.addDocument(" ortopedi mata audiolog "," 5fdd027440c9250d2c7d6e0d ");
    classifier.addDocument(" pulmonolog tht audiolog "," 5fdd027540c9250d2c7d6e0f ");
    classifier.addDocument(" kardiolog pulmonolog anak "," 5fdd027540c9250d2c7d6e11 ");
    classifier.addDocument(" endokrinologi audiolog saraf "," 5fdd027640c9250d2c7d6e13 ");
    classifier.addDocument(" gigi saraf ortopedi "," 5fdd027640c9250d2c7d6e15 ");
    classifier.addDocument(" audiolog ortopedi saraf "," 5fdd027640c9250d2c7d6e17 ");
    classifier.addDocument(" jantung anak pulmonolog "," 5fdd027740c9250d2c7d6e19 ");
    classifier.addDocument(" saraf ortopedi tht "," 5fdd027740c9250d2c7d6e1b ");
    classifier.addDocument(" pulmonolog mata ginekolog "," 5fdd027840c9250d2c7d6e1d ");
    classifier.addDocument(" psikiater tht onkologi "," 5fdd027840c9250d2c7d6e1f ");
    classifier.addDocument(" pulmonolog tht ortopedi "," 5fdd027940c9250d2c7d6e21 ");
    classifier.addDocument(" saraf ginekolog kardiolog "," 5fdd027940c9250d2c7d6e23 ");
    classifier.addDocument(" mata radiolog anak "," 5fdd027a40c9250d2c7d6e25 ");
    classifier.addDocument(" ortopedi radiolog endokrinologi "," 5fdd027a40c9250d2c7d6e27 ");
    classifier.addDocument(" ortopedi psikiater endokrinologi "," 5fdd027b40c9250d2c7d6e29 ");
    classifier.addDocument(" kardiolog audiolog pulmonolog "," 5fdd027b40c9250d2c7d6e2b ");
    classifier.addDocument(" tht anak onkologi "," 5fdd027c40c9250d2c7d6e2d ");
    classifier.addDocument(" saraf ortopedi tht "," 5fdd027c40c9250d2c7d6e2f ");
    classifier.addDocument(" pulmonolog audiolog saraf "," 5fdd027c40c9250d2c7d6e31 ");
    classifier.addDocument(" kardiolog jantung anak "," 5fdd027d40c9250d2c7d6e33 ");
    classifier.addDocument(" audiolog jantung endokrinologi "," 5fdd027d40c9250d2c7d6e35 ");
    classifier.addDocument(" onkologi ginekolog mata "," 5fdd027e40c9250d2c7d6e37 ");
    classifier.addDocument(" ortopedi saraf anak "," 5fdd027e40c9250d2c7d6e39 ");
    classifier.addDocument(" tulang kulit gigi "," 5fdd031140433435fc2646a2 ");
    classifier.train();
    console.log("done training");
    // console.log(classifier.getClassifications('tulang kulit gigi'));
    var sorted = [];
    var sortedRecommend = []
    var unsorted = classifier.getClassifications(param);
    for(var key in unsorted) {
        sortedRecommend[sortedRecommend.length] = unsorted[key]
    }
    for(x of sortedRecommend.sort()){
        sorted[sorted.length] = x
    }
    console.log(sorted);
    return sorted;
}
module.exports = router