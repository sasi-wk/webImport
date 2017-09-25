var fs = require('fs')
var unzip = require('unzip')
var path = require('path')
var mkdir = require('mkdirp')
var lineByLine = require('n-readlines')
var removeFile = require('./remove')

function o() {
    l = '';
    return {
        a: function () {

        }, b: function () {

        }
    }
}

/**reading file from output folder and push value to data[][] */
function DataSetReader(file) {
    var l = new lineByLine(file)
    var h = l.next().toString('ascii').split('|')
    var b;
    this.next = function () {
        if (b = l.next()) {
            return b = b.toString('ascii').replace('\r', '').split('|');
        } else {
            return b = undefined;
        }
    }
    this.get = function (k) {
        var i = h.indexOf(k);
        return i === -1 ? null : (b[i] || undefined);
    }
}

module.exports = {
    fileReader: function (options) {
        var outputFolder = './outputs/' + options.filenamePath + '/'
        fs.createReadStream(options.inputPath)
            .pipe(unzip.Parse())
            .on('entry', function (entry) {
                var fileName = entry.path
                if (entry.type === 'File') {
                    var fullPath = outputFolder + path.dirname(fileName)
                    fileName = path.basename(fileName)
                    mkdir.sync(fullPath)
                    entry.pipe(fs.createWriteStream(fullPath + '/' + fileName))
                }
            })
            .on('close', function () {
                /**Remove file in uploads directory */
                setTimeout(function () {
                    var rmpath = options.inputPath
                    console.log(rmpath)
                    removeFile.removeInputFile(rmpath)
                }, 1000)

                /**read file */
                setTimeout(function () {
                    if (fs.existsSync(outputFolder + '/service.txt') && fs.existsSync(outputFolder + '/clinic.txt') && fs.existsSync(outputFolder + '/patient.txt')) {
                    var service_dsr = new DataSetReader(outputFolder + '/service.txt')
                    var list = [];
                    while (service_dsr.next()) {
                        var ServiceDelegate = {
                            vn: service_dsr.get('vn'),
                            visit_datetime: service_dsr.get('visit_datetime'),
                            type: service_dsr.get('type'),
                            ins_no: service_dsr.get('ins_no'),
                            ins_type: service_dsr.get('ins_type'),
                            primary_hospital: service_dsr.get('primary_hospital'),
                            regular_hospital: service_dsr.get('regular_hospital'),
                            refer_hospital: service_dsr.get('refer_hospital'),
                            symptom_historical: service_dsr.get('symptom_historical'),
                            active: service_dsr.get('active'),
                            updatedatetime: service_dsr.get('updatedatetime'),
                            clinic: [],
                            vitalsign: [],
                            diag: [],
                            procedure: [],
                            drug: [],
                            admit: [],
                            lab: [],
                            finance: [],
                            appoint: [],
                            refer: [],
                            xray: [],
                            checkup: [],
                            patient: [],
                            doctor: []
                        }                      
                        var clinic_dsr = new DataSetReader(outputFolder + '/clinic.txt');
                        while (clinic_dsr.next()) {
                            if (clinic_dsr.get('hcode') === service_dsr.get('hcode')
                                && clinic_dsr.get('vn') === service_dsr.get('vn')) {
                                var clinic_data = {
                                    clinic: clinic_dsr.get('clinic'),
                                    clinic_label: clinic_dsr.get('clinic_label'),
                                    chief_complaint: clinic_dsr.get('chief_complaint'),
                                    symptom: clinic_dsr.get('symptom'),
                                    active: clinic_dsr.get('active'),
                                    updatedatetime: clinic_dsr.get('updatedatetime')
                                }
                                ServiceDelegate.clinic.push(clinic_data)
                            }
                        }
                        if (fs.existsSync(outputFolder + '/vitalsign.txt')) {
                            var vitalsign_dsr = new DataSetReader(outputFolder + '/vitalsign.txt');
                            while (vitalsign_dsr.next()) {
                                if (vitalsign_dsr.get('hcode') === service_dsr.get('hcode') && vitalsign_dsr.get('vn') === service_dsr.get('vn')) {
                                    var vitalsign_data = {
                                        vitalsign_datetime: vitalsign_dsr.get('vitalsign_datetime'),
                                        clinic: vitalsign_dsr.get(' clinic'),
                                        clinic_label: vitalsign_dsr.get(' clinic_label'),
                                        weight: vitalsign_dsr.get('weight'),
                                        height: vitalsign_dsr.get('height'),
                                        temp: vitalsign_dsr.get('temp'),
                                        pr: vitalsign_dsr.get('pr'),
                                        rr: vitalsign_dsr.get('rr'),
                                        sbp: vitalsign_dsr.get('sbp'),
                                        dbp: vitalsign_dsr.get('dbp'),
                                        bmi: vitalsign_dsr.get('bmi'),
                                        waist: vitalsign_dsr.get('waist'),
                                        hips: vitalsign_dsr.get('hips'),
                                        chest: vitalsign_dsr.get('chest'),
                                        other: vitalsign_dsr.get('other'),
                                        active: vitalsign_dsr.get('active'),
                                        updatedatetime: vitalsign_dsr.get('updatetime')
                                    }
                                    ServiceDelegate.vitalsign.push(vitalsign_data)
                                }
                            }
                        }
                        if (fs.existsSync(outputFolder + '/diag.txt')) {
                            var diag_dsr = new DataSetReader(outputFolder + '/diag.txt');
                            while (diag_dsr.next()) {
                                if (diag_dsr.get('hcode') === service_dsr.get('hcode') && diag_dsr.get('vn') === service_dsr.get('vn')) {
                                    var diag_data = {
                                        icd10: diag_dsr.get('icd10'),
                                        icd10_label: diag_dsr.get('icd10_label'),
                                        clinic: diag_dsr.get('clinic'),
                                        clinic_label: diag_dsr.get('clinic_label'),
                                        dx_datetime: diag_dsr.get('dx_datetime'),
                                        diag: diag_dsr.get(' diag'),
                                        dxtype: diag_dsr.get('dxtype'),
                                        dxtype_label: diag_dsr.get('  dxtype_label'),
                                        dct: diag_dsr.get('dct'),
                                        dct_label: diag_dsr.get('dct_label'),
                                        active: diag_dsr.get(' active'),
                                        updatedatetime: diag_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.diag.push(diag_data)
                                }
                            }
                        }
                        if (fs.existsSync(outputFolder + '/procedure.txt')) {
                            var procedure_dsr = new DataSetReader(outputFolder + '/procedure.txt');
                            while (procedure_dsr.next()) {
                                if (procedure_dsr.get('hcode') === service_dsr.get('hcode') && procedure_dsr.get('vn') === service_dsr.get('vn')) {
                                    var procedure_data = {
                                        icd9: procedure_dsr.get('icd9'),
                                        icd9_label: procedure_dsr.get('icd9_label'),
                                        clinic: procedure_dsr.get('clinic'),
                                        clinic_label: procedure_dsr.get('clinic_label'),
                                        dct: procedure_dsr.get('dct'),
                                        dct_label: procedure_dsr.get('dct_label'),
                                        start_datetime: procedure_dsr.get(' start_datetime'),
                                        end_datetime: procedure_dsr.get('end_datetime'),
                                        qty: procedure_dsr.get(' qty'),
                                        active: procedure_dsr.get('active'),
                                        updatedatetime: procedure_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.procedure.push(procedure_data)
                                }
                            }
                        }

                        if (fs.existsSync(outputFolder + '/drug.txt')) {
                            var drug_dsr = new DataSetReader(outputFolder + '/drug.txt');
                            while (drug_dsr.next()) {
                                if (drug_dsr.get('hcode') === service_dsr.get('hcode') && drug_dsr.get('vn') === service_dsr.get('vn')) {
                                    var drug_data = {
                                        no: drug_dsr.get('no'),
                                        drug_no: drug_dsr.get(' drug_no'),
                                        drug_code: drug_dsr.get('drug_code'),
                                        drug_code_label: drug_dsr.get('drug_code_label'),
                                        clinic: drug_dsr.get('clinic'),
                                        clinic_label: drug_dsr.get('clinic_label'),
                                        qty: drug_dsr.get('qty'),
                                        drug_datetime: drug_dsr.get('drug_datetime'),
                                        unit: drug_dsr.get('unit'),
                                        unit_label: drug_dsr.get(' unit_label'),
                                        use: drug_dsr.get('use'),
                                        drugprice: drug_dsr.get('drugprice'),
                                        drugcost: drug_dsr.get('drugcost'),
                                        dct: drug_dsr.get('dct'),
                                        dct_label: drug_dsr.get('dct_label'),
                                        active: drug_dsr.get('active'),
                                        updatedatetime: drug_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.drug.push(drug_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/admit.txt')) {
                            var admit_dsr = new DataSetReader(outputFolder + '/admit.txt');
                            while (admit_dsr.next()) {
                                if (admit_dsr.get('hcode') === service_dsr.get('hcode') && admit_dsr.get('vn') === service_dsr.get('vn')) {
                                    var admit_data = {
                                        an: admit_dsr.get('an'),
                                        adm_datetime: admit_dsr.get('adm_datetime'),
                                        dsc_datetime: admit_dsr.get('dsc_datetime'),
                                        dischs_type: admit_dsr.get(' dischs_type'),
                                        dischs_type_label: admit_dsr.get('dischs_type_label'),
                                        clinic: admit_dsr.get('clinic'),
                                        clinic_label: admit_dsr.get('clinic_label'),
                                        hptcourse: admit_dsr.get('hptcourse'),
                                        xray: admit_dsr.get('xray'),
                                        cultures: admit_dsr.get(' cultures'),
                                        pathology: admit_dsr.get('pathology'),
                                        investigation: admit_dsr.get(' investigation'),
                                        dct: admit_dsr.get('dct'),
                                        dct_label: admit_dsr.get(' dct_label'),
                                        dscdct: admit_dsr.get('dscdct'),
                                        dscdct_label: admit_dsr.get('dscdct_label'),
                                        active: admit_dsr.get('active'),
                                        updatedatetime: admit_dsr.get('updatedatetime'),
                                    }
                                    ServiceDelegate.admit.push(admit_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/lab.txt')) {
                            var lab_dsr = new DataSetReader(outputFolder + '/lab.txt');
                            while (lab_dsr.next()) {
                                if (lab_dsr.get('hcode') === service_dsr.get('hcode') && lab_dsr.get('vn') === service_dsr.get('vn')) {
                                    var lab_data = {
                                        no:lab_dsr.get('no'),
                                        lab_no: lab_dsr.get('lab_no'),
                                        lab: lab_dsr.get('lab'),
                                        lab_label: lab_dsr.get('lab_label'),
                                        lab_chart: lab_dsr.get('lab_chart'),
                                        lab_type: lab_dsr.get('lab_type'),
                                        lab_type_label: lab_dsr.get('lab_type_label'),
                                        labprofile_type: lab_dsr.get('labprofile_type'),
                                        labprofile_type_label: lab_dsr.get('labprofile_type_label'),
                                        labprofile: lab_dsr.get('labprofile'),
                                        labprofile_label: lab_dsr.get('labprofile_label'),
                                        lab_datetime: lab_dsr.get('lab_datetime'),
                                        result_datetime: lab_dsr.get('result_datetime'),
                                        result: lab_dsr.get('result'),
                                        dct: lab_dsr.get('dct'),
                                        dct_label: lab_dsr.get('dct_label'),
                                        clinic: lab_dsr.get('clinic'),
                                        clinic_label: lab_dsr.get('clinic_label'),
                                        units: lab_dsr.get('units'),
                                        units_label: lab_dsr.get('units_label'),
                                        reference_ranges: lab_dsr.get('reference_ranges'),
                                        flag: lab_dsr.get('flag'),
                                        flag_label: lab_dsr.get('flag_label'),
                                        specimen: lab_dsr.get('specimen'),
                                        specimen_label: lab_dsr.get('specimen_label'),
                                        source: lab_dsr.get('source'),
                                        source_label: lab_dsr.get('source_label'),
                                        qty: lab_dsr.get(' qty'),
                                        active: lab_dsr.get('active'),
                                        updatedatetime: lab_dsr.get(' updatedatetime'),
                                    }
                                    ServiceDelegate.lab.push(lab_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/finance.txt')) {
                            var finance_dsr = new DataSetReader(outputFolder + '/finance.txt');
                            while (finance_dsr.next()) {
                                if (finance_dsr.get('hcode') === service_dsr.get('hcode') && finance_dsr.get('vn') === service_dsr.get('vn')) {
                                    var finance_data = {
                                        finance_datetime: finance_dsr.get('finance_datetime'),
                                        chargitem: finance_dsr.get('chargitem'),
                                        chargitem_label: finance_dsr.get('chargitem_label'),
                                        ins_type: finance_dsr.get('ins_type'),
                                        ins_type_label: finance_dsr.get(' ins_type_label'),
                                        cost: finance_dsr.get('cost'),
                                        price: finance_dsr.get('price'),
                                        withdraw: finance_dsr.get('withdraw'),
                                        not_withdraw: finance_dsr.get('not_withdraw'),
                                        active: finance_dsr.get('active'),
                                        updatedatetime: finance_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.finance.push(finance_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/appoint.txt')) {
                            var appoint_dsr = new DataSetReader(outputFolder + '/appoint.txt');
                            while (appoint_dsr.next()) {
                                if (appoint_dsr.get('hcode') === service_dsr.get('hcode') && appoint_dsr.get('vn') === service_dsr.get('vn')) {
                                    var appoint_data = {
                                        appoint_datetime: appoint_dsr.get(''),
                                        seq: appoint_dsr.get(' seq'),
                                        clinic: appoint_dsr.get('clinic'),
                                        clinic_label: appoint_dsr.get('clinic_label'),
                                        dct: appoint_dsr.get('dct'),
                                        dct_label: appoint_dsr.get('dct_label'),
                                        note: appoint_dsr.get('note'),
                                        pretreat: appoint_dsr.get('pretreat'),
                                        active: appoint_dsr.get('active'),
                                        updatedatetime: appoint_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.appoint.push(appoint_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/refer.txt')) {
                            var refer_dsr = new DataSetReader(outputFolder + '/refer.txt');
                            while (refer_dsr.next()) {
                                if (refer_dsr.get('hcode') === service_dsr.get('hcode') && refer_dsr.get('vn') === service_dsr.get('vn')) {
                                    var refer_data = {
                                        refer_no: refer_dsr.get('refer_no'),
                                        refer_type: refer_dsr.get('refer_no'),
                                        refer_type_label: refer_dsr.get('refer_type_label'),
                                        refer_hcode: refer_dsr.get('refer_hcode'),
                                        refer_hcode_label: refer_dsr.get('refer_hcode_label'),
                                        refer_datetime: refer_dsr.get('refer_datetime'),
                                        chief_complaint: refer_dsr.get('chief_complaint'),
                                        symptom: refer_dsr.get('symptom'),
                                        symptom_historical: refer_dsr.get('symptom_historical'),
                                        prelab: refer_dsr.get('prelab'),
                                        predx: refer_dsr.get('predx'),
                                        pretreat: refer_dsr.get('pretreat'),
                                        cause: refer_dsr.get('cause'),
                                        cause_label: refer_dsr.get('cause_label'),
                                        othcause: refer_dsr.get('othcause'),
                                        dct: refer_dsr.get('dct'),
                                        dct_label: refer_dsr.get('dct_label'),
                                        priority: refer_dsr.get('priority'),
                                        priority_label: refer_dsr.get('priority_label'),
                                        request: refer_dsr.get('request'),
                                        active: refer_dsr.get('active'),
                                        updatedatetime: refer_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.refer.push(refer_data)
                                }
                            }
                        }


                        if (fs.existsSync(outputFolder + '/xray.txt')) {
                            var xray_dsr = new DataSetReader(outputFolder + '/xray.txt');
                            while (xray_dsr.next()) {
                                if (xray_dsr.get('hcode') === service_dsr.get('hcode') && xray_dsr.get('vn') === service_dsr.get('vn')) {
                                    var xray_data = {
                                        no: xray_dsr.get('no'),
                                        xray_no: xray_dsr.get('xray_no'),
                                        xray: xray_dsr.get('xray'),
                                        xray_label: xray_dsr.get('xray_label'),
                                        xray_desc: xray_dsr.get('xray_desc'),
                                        xray_datetime: xray_dsr.get('xray_datetime'),
                                        result_datetime: xray_dsr.get('result_datetime'),
                                        result: xray_dsr.get('result'),
                                        clinic: xray_dsr.get('clinic'),
                                        clinic_label: xray_dsr.get('clinic_label'),
                                        clinic_desc: xray_dsr.get('clinic_desc'),
                                        dct: xray_dsr.get('dct'),
                                        dct_label: xray_dsr.get('dct_label'),
                                        dct_desc: xray_dsr.get('dct_desc'),
                                        qty: xray_dsr.get('qty'),
                                        updatedatetime: xray_dsr.get('updatedatetime'),
                                        active: xray_dsr.get('active'),
                                    }
                                    ServiceDelegate.xray.push(xray_data)
                                }
                            }
                        }

                        if (fs.existsSync(outputFolder + '/checkup.txt')) {
                            var checkup_dsr = new DataSetReader(outputFolder + '/checkup.txt');
                            while (checkup_dsr.next()) {
                                if (checkup_dsr.get('hcode') === service_dsr.get('hcode') && checkup_dsr.get('vn') === service_dsr.get('vn')) {
                                    var checkup_data = {
                                        hcode: checkup_dsr.get('hcode'),
                                        vn: checkup_dsr.get('vn'),
                                        lead_value: checkup_dsr.get('lead_value'),
                                        lead_result: checkup_dsr.get('lead_result'),
                                        lead_datetime: checkup_dsr.get('lead_datetime'),
                                        fev1_value: checkup_dsr.get('fev1_value'),
                                        fvc_value: checkup_dsr.get('fvc_value'),
                                        fev1fvc_value: checkup_dsr.get('fev1fvc_value'),
                                        pulmonary_result: checkup_dsr.get('pulmonary_result'),
                                        pulmonary_datetime: checkup_dsr.get('pulmonary_datetime'),
                                        loundness_level1: checkup_dsr.get('loundness_level1'),
                                        loundness_level2: checkup_dsr.get('loundness_level2'),
                                        loundness_level3_left: checkup_dsr.get('loundness_level3_left'),
                                        loundness_level3_right: checkup_dsr.get('loundness_level3_right'),
                                        loundness_level4_left: checkup_dsr.get('loundness_level4_left'),
                                        loundness_level4_right: checkup_dsr.get('loundness_level4_right'),
                                        active: checkup_dsr.get('active'),
                                        updatedatetime: checkup_dsr.get('updatedatetime'),
                                    }
                                    ServiceDelegate.checkup.push(checkup_data)
                                }
                            }
                        }
                        if (fs.existsSync(outputFolder + '/patient.txt')) {
                            var patient_dsr = new DataSetReader(outputFolder + '/patient.txt');
                            while (patient_dsr.next()) {
                                if (patient_dsr.get('hcode') === service_dsr.get('hcode') && patient_dsr.get('hn') === service_dsr.get('hn')) {
                                    var patient_data = {
                                        hcode: patient_dsr.get('hcode'),
                                        hcode_label: patient_dsr.get('hcode_label'),
                                        hn: patient_dsr.get('hn'),
                                        cid: patient_dsr.get('cid'),
                                        under: patient_dsr.get('under'),
                                        under_label: patient_dsr.get('under_label'),
                                        prename: patient_dsr.get('prename'),
                                        prename_label: patient_dsr.get('prename_label'),
                                        fname: patient_dsr.get('prename_label'),
                                        lname: patient_dsr.get('lname'),
                                        birthdate: patient_dsr.get('lname'),
                                        gender: patient_dsr.get('gender'),
                                        gender_label: patient_dsr.get('gender_label'),
                                        marriage: patient_dsr.get('marriage'),
                                        marriage_label: patient_dsr.get('marriage_label'),
                                        nation: patient_dsr.get('nation'),
                                        nation_label: patient_dsr.get('nation_label'),
                                        race: patient_dsr.get('race'),
                                        race_label: patient_dsr.get('race_label'),
                                        religion: patient_dsr.get('religion'),
                                        religion_label: patient_dsr.get('religion_label'),
                                        abogroup: patient_dsr.get('abogroup'),
                                        abogroup_label: patient_dsr.get('abogroup_label'),
                                        rhgroup: patient_dsr.get('rhgroup'),
                                        rhgroup_label: patient_dsr.get('rhgroup_label'),
                                        ins_no: patient_dsr.get('ins_no'),
                                        ins_type: patient_dsr.get('ins_type'),
                                        ins_type_label: patient_dsr.get('ins_type_label'),
                                        catm_register: patient_dsr.get('catm_register'),
                                        catm_register_changewat: patient_dsr.get('catm_register_changewat'),
                                        catm_register_ampur: patient_dsr.get('catm_register_ampur'),
                                        catm_register_tambon: patient_dsr.get('catm_register_tambon'),
                                        catm_register_mooban: patient_dsr.get('catm_register_mooban'),
                                        house_no_register: patient_dsr.get('house_no_register'),
                                        room_no_register: patient_dsr.get('room_no_register'),
                                        building_register: patient_dsr.get('building_register'),
                                        soi_main_register: patient_dsr.get('soi_main_register'),
                                        soi_sub_register: patient_dsr.get('soi_sub_register'),
                                        road_register: patient_dsr.get('road_register'),
                                        village_register: patient_dsr.get('village_register'),
                                        catm_current: patient_dsr.get('catm_current'),
                                        catm_current_changewat: patient_dsr.get('catm_current_changewat'),
                                        catm_current_ampur: patient_dsr.get('catm_current_ampur'),
                                        catm_current_tambon: patient_dsr.get('catm_current_tambon'),
                                        catm_current_mooban: patient_dsr.get('catm_current_mooban'),
                                        house_no_current: patient_dsr.get('house_no_current'),
                                        room_no_current: patient_dsr.get('room_no_current'),
                                        building_current: patient_dsr.get('building_current'),
                                        soi_main_current: patient_dsr.get('soi_main_current'),
                                        soi_sub_current: patient_dsr.get('soi_sub_current'),
                                        road_current: patient_dsr.get('road_current'),
                                        village_current: patient_dsr.get('village_current'),
                                        catm_contact: patient_dsr.get('catm_contact'),
                                        catm_contact_changewat: patient_dsr.get('catm_contact_changewat'),
                                        catm_contact_ampur: patient_dsr.get('catm_contact_ampur'),
                                        catm_contact_tambon: patient_dsr.get('catm_contact_tambon'),
                                        catm_contact_mooban: patient_dsr.get('catm_contact_mooban'),
                                        house_no_contact: patient_dsr.get('house_no_contact'),
                                        room_no_contact: patient_dsr.get('room_no_contact'),
                                        building_contact: patient_dsr.get('building_contact'),
                                        soi_main_contact: patient_dsr.get('soi_main_contact'),
                                        soi_sub_contact: patient_dsr.get('soi_sub_contact'),
                                        road_contact: patient_dsr.get('road_contact'),
                                        village_contact: patient_dsr.get('village_contact'),
                                        phone_number_register: patient_dsr.get('phone_number_register'),
                                        phone_number_current: patient_dsr.get('phone_number_current'),
                                        phone_number_contact: patient_dsr.get('phone_number_contact'),
                                        phone_number_business: patient_dsr.get('phone_number_business'),
                                        job_type: patient_dsr.get('job_type'),
                                        job_type_label: patient_dsr.get('job_type_label'),
                                        smoke: patient_dsr.get('smoke'),
                                        smoke_label: patient_dsr.get('smoke_label'),
                                        active: patient_dsr.get('active'),
                                        updatedatetime: patient_dsr.get('updatedatetime'),
                                        allergy: [],
                                        patient_ref: []
                                    }
                                    if (fs.existsSync()) {
                                        var allergy_dsr = new DataSetReader(outputFolder + '/allergy.txt');
                                        while (allergy_dsr.next()) {
                                            if (allergy_dsr.get('hcode') === patient_dsr.get('hcode') && allergy_dsr.get('hn') === patient_dsr.get('hn')) {
                                                var allergy_data = {
                                                    seq: allergy_dsr.get('seq'),
                                                    type: allergy_dsr.get('type'),
                                                    type_label: allergy_dsr.get('type_label'),
                                                    name: allergy_dsr.get('name'),
                                                    symptom: allergy_dsr.get('symptom'),
                                                    active: allergy_dsr.get('active'),
                                                    updatedatetime: allergy_dsr.get('updatedatetime'),
                                                }
                                                patient_data.allergy.push(allergy_data)
                                            }
                                        }
                                    }
                                    if (fs.existsSync()) {
                                        var patient_ref_dsr = new DataSetReader(outputFolder + '/patient_ref.txt');
                                        while (patient_ref_dsr.next()) {
                                            if (patient_ref_dsr.get('hcode') === patient_dsr.get('hcode') && patient_ref_dsr.get('hn') === patient_dsr.get('hn')) {
                                                var patient_ref_data = {
                                                    seq: patient_ref_dsr.get('seq'),
                                                    prename: patient_ref_dsr.get('prename'),
                                                    prename_label: patient_ref_dsr.get('prename_label'),
                                                    fname: patient_ref_dsr.get('fname'),
                                                    lname: patient_ref_dsr.get('lname'),
                                                    phone_number: patient_ref_dsr.get('phone_number'),
                                                    relationship: patient_ref_dsr.get('relationship'),
                                                    active: patient_ref_dsr.get('active'),
                                                    updatedatetime: patient_ref_dsr.get('updatedatetime'),

                                                }
                                                patient_data.patient_ref.push(patient_ref_data)
                                            }
                                        }
                                    }
                                    ServiceDelegate.patient.push(patient_data)
                                }
                            }
                        }
                        if (fs.existsSync(outputFolder + '/doctor.txt')) {
                            var doctor_dsr = new DataSetReader(outputFolder + '/doctor.txt');
                            while (doctor_dsr.next()) {
                                if (doctor_dsr.get('hcode') === service_dsr.get('hcode') && doctor_dsr.get('vn') === service_dsr.get('vn')) {
                                    var doctor_data = {
                                        code: doctor_dsr.get('code'),
                                        prename: doctor_dsr.get('prename'),
                                        fname: doctor_dsr.get('fname'),
                                        lname: doctor_dsr.get('lname'),
                                        gender: doctor_dsr.get('gender'),
                                        active: doctor_dsr.get('active'),
                                        updatedatetime: doctor_dsr.get('updatedatetime')
                                    }
                                    ServiceDelegate.doctor.push(doctor_data)
                                }
                            }
                        }
                        list.push(ServiceDelegate)
                        //console.log(JSON.stringify(list))
                        typeof options.callback === 'function' && options.callback(list)
                    }
                } else {
                    console.log("not find")
                }
            },3000)
        })
    }
}