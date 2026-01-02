<?php


class ToolRepair2 extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->masterConfigUi = $this->config->item("heTransaksi_ui");
        $this->load->helper("he_angka");
    }

    function index()
    {
        $arrTools = array(
            "kas" => "viewUnsyncedKas",
            "produk" => "viewUnsyncedProduk",
            "produk rakitan" => "viewUnsyncedProdukRakitan",
            "supplies" => "viewUnsyncedSupplies",
            "valas" => "viewUnsyncedValas",
        );

//        foreach ($arrTools as $key => $value) {
//            echo "<div>";
//            echo "<h3>";
//            echo "<a href='" . base_url() . get_class($this) . "/$value' target='_blank'>:: $key ::</a>";
//            echo "</h3>";
//            echo "</div>";
//        }
    }

    //-------------------------
    public function patchProject()
    {
        $this->load->helper("he_mass_table");
        $this->load->model("MdlTransaksi");
        $this->load->model("Coms/ComTransaksiProject");
        $arrComProject = array();
//        array(
//            "comName" => "TransaksiProject",
//            "loop" => array(
//                "project" => "grandTotal",
//            ),
//            "static" => array(
//                "cabang_id" => "placeID",
//                "cabang_nama" => "placeName",
//                "extern_id" => "projectID",
//                "extern_nama" => "projectName",
//                "terbayar" => "grandTotal",
//            ),
//            "reversable" => true,
//            "srcGateName" => "main",
//            "srcRawGateName" => "main",
//        ),

        $tr = New MdlTransaksi();
        $tr->addFilter("trash_4='0'");
        $tr->addFilter("jenis='588st'");
        $trTmp = $tr->lookupAll()->result();
        cekBiru(count($trTmp));
        if (sizeof($trTmp) > 0) {
            foreach ($trTmp as $trSpec) {
                $trid = $trSpec->id;
                $trreg = New MdlTransaksi();
                $trreg->setFilters(array());
                $trreg->addFilter("transaksi_id='$trid'");
                $trreg->setJointSelectFields("transaksi_id, main");
                $tmpReg = $trreg->lookupDataRegistries()->result();
                $main = blobDecode($tmpReg[0]->main);
                $arrComProject[$trid] = array(
                    "loop" => array(
                        "project" => $main["grandTotal"],
                    ),
                    "static" => array(
                        "cabang_id" => $main["placeID"],
                        "cabang_nama" => $main["placeName"],
                        "extern_id" => $main["projectID"],
                        "extern_nama" => $main["projectName"],
                        "terbayar" => $main["grandTotal"],
                        "transaksi_id" => $trSpec->id,
                        "transaksi_no" => $trSpec->nomer,
                        "dtime" => $trSpec->dtime,
                        "fulldate" => $trSpec->fulldate,
                    ),
                );
            }
        }
//        arrPrintCyan($arrComProject);


        $this->db->trans_start();

        if (sizeof($arrComProject) > 0) {
            foreach ($arrComProject as $trid => $spec) {
                $cp = New ComTransaksiProject();
                $cp->pair($spec);
                $cp->exec();
            }
        }

        mati_disini("---SETOP--- " . __LINE__);
        $this->db->trans_complete() or die("Gagal saat berusaha  commit transaction!");
        cekHijau("<h3>DONE...</h3>");
    }


    public function patchPenerimaanPenjualanTunai_OLD()
    {
        $date1 = "2024-07-01";
        $date2 = "2024-12-31";

        $this->load->model("MdlTransaksi");
        $tr = New MdlTransaksi();
        $tr->addFilter("jenis='4464'");
//        $tr->addFilter("trash_4='0'");
        $tr->addFilter("date(dtime)>='$date1'");
        $tr->addFilter("date(dtime)<='$date2'");
        $trTmp = $tr->lookupAll()->result();
        showLast_query("biru");
        cekBiru(count($trTmp));


        $this->db->trans_start();


        if (sizeof($trTmp) > 0) {
            foreach ($trTmp as $trSpec) {
                $trid = $trSpec->id;
                $trreg = New MdlTransaksi();
                $trreg->setFilters(array());
                $trreg->addFilter("transaksi_id='$trid'");
                $trreg->setJointSelectFields("transaksi_id, main");
                $tmpReg = $trreg->lookupDataRegistries()->result();
                $main = blobDecode($tmpReg[0]->main);
                $nilai_bayar = $main["nilai_bayar"];

                $tr = New MdlTransaksi();
                $where = array(
                    "id" => $trid,
                );
                $data = array(
                    "transaksi_nilai" => $nilai_bayar,
                    "transaksi_net" => $nilai_bayar,
                );
                $tr->setFilters(array());
                $tr->updateData($where, $data);
                showLast_query("orange");
            }
        }

//        mati_disini("---SETOP--- " . __LINE__);
        $this->db->trans_complete() or die("Gagal saat berusaha  commit transaction!");
        cekHijau("<h3>DONE...</h3>");


    }

    public function patchPenerimaanPenjualanTunai()
    {
//        $date1 = "2024-01-01";
//        $date2 = "2024-06-31";
//        $date1 = "2024-07-01";
//        $date2 = "2024-12-31";
        $date1 = "2025-01-01";
        $date2 = "2025-12-31";

        $this->load->model("MdlTransaksi");
        $tr = New MdlTransaksi();
        $tr->addFilter("jenis in ('4464','749')");
//        $tr->addFilter("trash_4='0'");
        $tr->addFilter("date(dtime)>='$date1'");
        $tr->addFilter("date(dtime)<='$date2'");
        $trTmp = $tr->lookupAll()->result();
        showLast_query("biru");
        cekBiru(count($trTmp));


        $this->db->trans_start();


        if (sizeof($trTmp) > 0) {
            foreach ($trTmp as $trSpec) {
                $trid = $trSpec->id;
                $trreg = New MdlTransaksi();
                $trreg->setFilters(array());
                $trreg->addFilter("transaksi_id='$trid'");
                $trreg->setJointSelectFields("transaksi_id, main");
                $tmpReg = $trreg->lookupDataRegistries()->result();
                $main = blobDecode($tmpReg[0]->main);
                $nilai_bayar = $main["nilai_bayar"];

                $tr = New MdlTransaksi();
                $where = array(
                    "id" => $trid,
                );
                $data = array(
                    "transaksi_nilai" => $nilai_bayar,
                    "transaksi_net" => $nilai_bayar,
                    //----
                    "bank_id" => isset($main["cash_account__folders"]) ? $main["cash_account__folders"] : 0,
                    "bank_nama" => isset($main["cash_account__folders_nama"]) ? $main["cash_account__folders_nama"] : 0,
                    "bank_rekening_id" => isset($main["cash_account"]) ? $main["cash_account"] : 0,
                    "bank_rekening_nama" => isset($main["cash_account__label"]) ? $main["cash_account__label"] : 0,
                );
                $tr->setFilters(array());
                $tr->updateData($where, $data);
                showLast_query("orange");
            }
        }

//        mati_disini("---SETOP--- " . __LINE__);
        $this->db->trans_complete() or die("Gagal saat berusaha  commit transaction!");
        cekHijau("<h3>DONE...</h3>");


    }


    public function run_susulanJurnal()
    {
//        if (isset($_GET["stop"]) && ($_GET["stop"] == 1)) {
//            cekMerah("TIDAK AUTO REFRESH");
//        }
//        else {
//            header("refresh:2");
//        }
        $this->load->model("MdlTransaksi");
        $this->load->model("CustomCounter");
        $this->load->helper("he_mass_table");
        $startDate = dtimeNow();


        $getTrID = (isset($_GET['tr_id']) && ($_GET['tr_id'] > 0)) ? $_GET['tr_id'] : 0;
        $addJudul = "";

        $tr = New MdlTransaksi();
        $tr->setSortBy(
            array(
                "kolom" => "id",
                "mode" => "ASC",
            )
        );
        $this->db->limit(1);

        // bila ada trID dari URL, maka ini adalah cek manual, tidak boleh close commit !!!
        if ($getTrID > 0) {
            $tr->addFilter("id='$getTrID'");

            $addJudul = "<br>cek manual";
        }
        else {
            $tr->addFilter("cli='0'");
        }

        $trTmp = $tr->lookupAll()->result();
        cekHere($this->db->last_query() . "<br>" . sizeof($trTmp));

        if (sizeof($trTmp) > 0) {
            $trID_cli = $trTmp[0]->id;
            $trTmpCabangID = $trTmp[0]->cabang_id;
            $kolom = array(
                "trID" => "id",
                "jenisTr" => "jenis",
                "jenisTrMaster" => "jenis_master",
                "jenisTrTop" => "jenis_top",
                "nomer" => "nomer",
                "nomerTop" => "nomer_top",
                "dtime" => "dtime",
                "fulldate" => "fulldate",
                "stepNumber" => "step_number",
                "indexRegistry" => "indexing_registry",
                "olehID" => "oleh_id",
                "olehNama" => "oleh_nama",
            );

            $arrKolomTrans = array();
            foreach ($kolom as $key => $val) {
                $arrKolomTrans[$key] = isset($trTmp[0]->$val) ? $trTmp[0]->$val : NULL;
            }

            $reg = New MdlTransaksi();
            $key = "indexRegistry";
            $index_reg = blobDecode($arrKolomTrans[$key]);
            $reg->setFilters(array());
//            $reg->addFilter("id in ('" . implode("','", $index_reg) . "')");
            $reg->addFilter("transaksi_id='" . $trTmp[0]->id . "'");
            $regTmp = $reg->lookupDataRegistries()->result();
            $registryGates = array();
            foreach ($regTmp as $regSpec) {
                foreach ($regSpec as $key_reg => $val_reg) {
                    if ($key_reg != "transaksi_id") {
                        $registryGates[$key_reg] = blobDecode($val_reg);
                    }
                }
            }

//cekHitam(":: cetak REGISTRY ::");
//            arrPrintWebs($registryGates["items8_sum"]);
//mati_disini();
//            arrprint($arrKolomTrans);
//            arrPrint($registryGates["items"]);
//             mati_disini();
            $jenisTr = $arrKolomTrans['jenisTr'];
            $jenisTrMaster = $arrKolomTrans['jenisTrMaster'];
            $fulldate = $arrKolomTrans['fulldate'];
            $dtime = $arrKolomTrans['dtime'];
            $stepNumber = $arrKolomTrans['stepNumber'];
            $insertNum = $tmpNomorNota = $arrKolomTrans['nomer'];
            $olehNama = $arrKolomTrans['olehNama'];
            $insertID = $transaksiID = $arrKolomTrans['trID'];
            /*---------------------- jenismaster untuk gerbang utama masuk modul, jenisTr adalah targetnya */
            /*------end*/
            $configCore = loadConfigModulJenis_he_misc($jenisTrMaster, "coTransaksiCore");
            $configUi = loadConfigModulJenis_he_misc($jenisTrMaster, "coTransaksiUi");
            $configLayout = loadConfigModulJenis_he_misc($jenisTrMaster, "coTransaksiLayout");

            cekHitam(":: jenisTrMaster-> $jenisTrMaster :: jenisTr-> $jenisTr :: [trID_cli: $trID_cli]");


            //region BUILD TABEL DATABASE OTOMATIS
            $cliComponent = "components";
            $buildTablesDetail = isset($configCore[$cliComponent][$jenisTr]['detail']) ? $configCore[$cliComponent][$jenisTr]['detail'] : array();
//arrPrintWebs($buildTablesDetail);
            if (sizeof($buildTablesDetail) > 0) {
                foreach ($buildTablesDetail as $buildTablesDetail_specs) {
//arrPrintWebs($buildTablesDetail_specs);
                    $buildTablesDetail_specs_result = $buildTablesDetail_specs;
                    $srcGateName = $buildTablesDetail_specs['srcGateName'];
                    $srcRawGateName = $buildTablesDetail_specs['srcRawGateName'];
//                    cekHitam(__LINE__ . ":: $srcGateName");
                    if (isset($registryGates[$srcGateName]) && sizeof($registryGates[$srcGateName]) > 0) {
                        foreach ($registryGates[$srcGateName] as $itemSpec) {

//                            arrPrintWebs($itemSpec);
                            $mdlName = $buildTablesDetail_specs['comName'];
//                            cekBiru("== $srcGateName == $mdlName ==");
                            if (substr($mdlName, 0, 1) == "{") {
                                $mdlName = trim($mdlName, "{");
                                $mdlName = trim($mdlName, "}");
                                $mdlName = str_replace($mdlName, $itemSpec[$mdlName], $mdlName);
                            }

//cekBiru("== $mdlName ==");
                            if (isset($buildTablesDetail_specs['loop'])) {
                                foreach ($buildTablesDetail_specs['loop'] as $key => $val) {
//cekKuning(":: $key => $val ::");
                                    unset($buildTablesDetail_specs_result['loop']);
                                    if (substr($key, 0, 1) == "{") {
                                        $key = trim($key, "{");
                                        $key = trim($key, "}");
                                        $key = str_replace($key, $itemSpec[$key], $key);
                                    }
                                    $buildTablesDetail_specs_result['loop'][$key] = $val;
//                                cekHitam("LINE: " . __LINE__ . " ::sini bukan??  akan build tabel detail $key");
                                }
                            }

//arrPrintWebs($buildTablesDetail_specs_result['loop']);
//                        cekHere($mdlName . " == " . $srcGateName);
                            $mdlName = "Com" . $mdlName;
                            $this->load->model("Coms/" . $mdlName);
                            $m = new $mdlName();
                            if (method_exists($m, "getTableNameMaster")) {
                                if (sizeof($m->getTableNameMaster())) {
//                                cekMerah(":: $mdlName ::");
//                                arrPrintWebs($buildTablesDetail_specs_result);
                                    $m->buildTables($buildTablesDetail_specs_result);
                                }
                            }
                        }

                    }
                    else {
//                        cekHere("TESTSTST");
                    }
                }
            }
            else {
                cekMerah(":: TIDAK ADA CONFIG cliComponent");
            }
            //endregion


            $this->db->trans_start();


            //region ----------subcomponents by cli

            $paramPatchers = $this->config->item('heTransaksi_paramPatchers') != null ? $this->config->item('heTransaksi_paramPatchers') : array();
            $paramForceFillers = $this->config->item('heTransaksi_paramForceFillers') != null ? $this->config->item('heTransaksi_paramForceFillers') : array();
            $validateSubComponent = $this->config->item('heTransaksi_validateComponentDetail') != null ? $this->config->item('heTransaksi_validateComponentDetail') : array();
            $paramForceFillersJenisTR = $this->config->item('heTransaksi_paramForceFillers_jenisTR') != null ? $this->config->item('heTransaksi_paramForceFillers_jenisTR') : array();

            $componentGate['detail'] = array();
            $componentConfig['master'] = array();
            $componentConfig['detail'] = array();
            if (isset($configCore['relativeComponets']) && $configCore['relativeComponets'] == true) {
                $iterator = isset($registryGates['revert']['jurnal']['detail']) ? $registryGates['revert']['jurnal']['detail'] : array();
                $revertedTarget = $registryGates['main']['pihakExternID'];
                $componentConfig['detail'] = $iterator;
                $iteratorMaster = $componentConfig['master'] = isset($registryGates['revert']['jurnal']['master']) ? $registryGates['revert']['jurnal']['master'] : array();
            }
            else {
                $iterator = isset($configCore[$cliComponent][$jenisTr]['detail']) ? $configCore[$cliComponent][$jenisTr]['detail'] : array();
                $componentConfig['detail'] = $iterator;
                $iteratorMaster = $componentConfig['master'] = isset($configCore[$cliComponent][$jenisTr]['master']) ? $configCore[$cliComponent][$jenisTr]['master'] : array();

                $revertedTarget = "";

            }
            $subComModel = array();
            if (sizeof($iterator) > 0) {
//                arrPrintKuning($iterator);
                $compValidators = ($this->config->item('transaksi_value_required_components') != null) ? $this->config->item('transaksi_value_required_components') : array();
                $filterNeeded = false;

                $arrRekeningLoop = array();

//                if (in_array($mdlName, $compValidators)) {//perlu validasi filter
//                    $filterNeeded = true;
//                }
                foreach ($iterator as $cCtr => $tComSpec) {
                    $comName_orig = $comName = $tComSpec['comName'];
                    $srcGateName = $tComSpec['srcGateName'];
                    $loopRequire = isset($tComSpec['loopRequire']) ? $tComSpec['loopRequire'] : false;
                    $srcRawGateName = $tComSpec['srcRawGateName'];

                    echo "sub-component: $comName, $srcGateName, initializing values <br>";

                    $tmpOutParams[$cCtr] = array();
                    if (isset($registryGates[$srcGateName]) && sizeof($registryGates[$srcGateName]) > 0) {

                        foreach ($registryGates[$srcGateName] as $id => $dSpec) {
                            $comName = $comName_orig;
                            if (substr($comName, 0, 1) == "{") {
                                $comName = trim($comName, "{");
                                $comName = trim($comName, "}");
                                $comName = str_replace($comName, $registryGates[$srcGateName][$id][$comName], $comName);
                                $tComSpec['comName'] = $comName;
                                $iterator[$cCtr]['comName'] = $comName;
                            }
//                        $subComModel[$comName] = $comName;
                            $filterNeeded = false;
                            $mdlName = "Com" . ucfirst($comName);
                            if (in_array($mdlName, $compValidators)) {//perlu validasi filter
                                $filterNeeded = true;
                            }


                            $subParams = array();
                            if (isset($tComSpec['loop'])) {
                                foreach ($tComSpec['loop'] as $key => $value) {
                                    if (substr($key, 0, 1) == "{") {
                                        $key = trim($key, "{");
                                        $key = trim($key, "}");
                                        $key = str_replace($key, $registryGates[$srcGateName][$id][$key], $key);
                                    }

                                    $subComModel[$key] = $comName;

                                    $realValue = makeValue($value, $registryGates[$srcGateName][$id], $registryGates[$srcGateName][$id], 0);

                                    if (strlen($key) > 1) {
                                        $subParams['loop'][$key] = $realValue;
                                    }
                                    else {
                                        $subParams['loop'] = array();
                                    }

                                    // =================== =================== ===================
                                    if (!isset($arrRekeningLoop[$dSpec[$tComSpec['static']['cabang_id']]][$key])) {
                                        $arrRekeningLoop[$dSpec[$tComSpec['static']['cabang_id']]][$key] = 0;
                                    }
                                    $arrRekeningLoop[$dSpec[$tComSpec['static']['cabang_id']]][$key] += $realValue;
                                    if ($realValue != 0) {
                                        cekUngu(":: cetak loop $key => $realValue ::");
                                    }

                                    if ($filterNeeded) {
                                        if ($subParams['loop'][$key] == 0) {
                                            unset($subParams['loop'][$key]);

                                            // =================== =================== ===================
                                        }
                                    }
                                }
                            }
                            if (isset($tComSpec['static'])) {
                                foreach ($tComSpec['static'] as $key => $value) {

                                    $realValue = makeValue($value, $registryGates[$srcGateName][$id], $registryGates[$srcGateName][$id], 0);
//                                    $subParams['static'][$key] = $realValue;
                                    $subParams['static'][$key] = trim($realValue);
//                                cekKuning("STATIC: $key diisi dengan $realValue");
                                }
                                if (isset($paramPatchers[$comName]) && sizeof($paramPatchers[$comName]) > 0) {
                                    foreach ($paramPatchers[$comName] as $k => $v) {
                                        if (!isset($subParams['static'][$k])) {
                                            $subParams['static'][$k] = isset($$v) ? $$v : "_v";
                                            cekOrange("fill :: $comName :: $k ($v) => " . $subParams['static'][$k]);
                                        }
                                    }
                                }
                                if (isset($paramForceFillers[$comName]) && sizeof($paramForceFillers[$comName]) > 0) {

                                    $jenis = $registryGates['main']['jenis'];
                                    foreach ($paramForceFillers[$comName] as $k => $v) {
                                        $subParams['static'][$k] = isset($$v) ? $$v : "_v";
                                        cekOrange("fillforce :: $comName :: $k ($v) => " . $subParams['static'][$k]);
                                    }
                                }
//                                arrPrintWebs($paramForceFillersJenisTR[$comName]);
//                                cekMerah($jenisTrMaster);
                                // tambahan custom gerbang saat simpan transaksi, tidak bisa ditambahkan di coTransaksiCore/coTransaksiValues
                                if (isset($paramForceFillersJenisTR[$comName][$jenisTrMaster]) && sizeof($paramForceFillersJenisTR[$comName][$jenisTrMaster]) > 0) {
                                    foreach ($paramForceFillersJenisTR[$comName][$jenisTrMaster] as $k => $v) {
                                        $subParams['static'][$k] = isset($$v) ? $$v : "_v";
                                        cekorange(":: $k diisikan dengan " . $subParams['static'][$k]);
                                    }
                                }
                                $subParams['static']["fulldate"] = $fulldate;
                                $subParams['static']["dtime"] = $dtime;
                                $subParams['static']["keterangan"] = $configUi['steps'][$stepNumber]['label'] . " nomor " . $tmpNomorNota . " oleh " . $olehNama;
                                //------
                                $subParams['static']["reference_id"] = isset($dSpec["referenceID"]) ? $dSpec["referenceID"] : "";
                                $subParams['static']["reference_nomer"] = isset($dSpec["referenceNomer"]) ? $dSpec["referenceNomer"] : "";
                                $subParams['static']["reference_jenis"] = isset($dSpec["jenisTr_reference"]) ? $dSpec["jenisTr_reference"] : "";
                                $subParams['static']["reference_id_top"] = isset($dSpec["referenceID_top"]) ? $dSpec["referenceID_top"] : "";
                                $subParams['static']["reference_nomer_top"] = isset($dSpec["referenceNomer_top"]) ? $dSpec["referenceNomer_top"] : "";
                                $subParams['static']["reference_jenis_top"] = isset($dSpec["pihakExternMasterID"]) ? $dSpec["pihakExternMasterID"] : "";
                                //------
                                if (strlen($revertedTarget) > 1) {
                                    $subParams['static']['reverted_target'] = $revertedTarget;
                                }
                            }
                            if (sizeof($subParams) > 0) {
                                if ($filterNeeded) {
                                    if (isset($subParams['loop']) && !empty($subParams['loop'])) {
                                        $tmpOutParams[$cCtr][] = $subParams;
                                    }
                                }
                                else {
                                    if (empty($subParams['loop']) && $loopRequire == true) {
                                        unset($tmpOutParams[$cCtr]);
                                    }
                                    else {
                                        $tmpOutParams[$cCtr][] = $subParams;
                                    }
                                }
                            }
                        }

                        $componentGate['detail'][$cCtr] = $subParams;
                    }

                }
//                arrPrintKuning($tmpOutParams);
                $it = 0;
                foreach ($iterator as $cCtr => $tComSpec) {
                    $it++;
                    $comName = $tComSpec['comName'];
                    $srcGateName = $tComSpec['srcGateName'];
                    $srcRawGateName = $tComSpec['srcRawGateName'];
                    if (isset($registryGates[$srcGateName]) && sizeof($registryGates[$srcGateName]) > 0) {
                        foreach ($registryGates[$srcGateName] as $id => $dSpec) {
                            if (substr($comName, 0, 1) == "{") {
                                $comName = trim($comName, "{");
                                $comName = trim($comName, "}");
                                $comName = str_replace($comName, $registryGates[$srcGateName][$id][$comName], $comName);
//                            $tComSpec['comName'] = $comName;
//                            $iterator[$cCtr]['comName'] = $comName;
//
//
                            }
                        }
                    }
                    else {
                        $comName = NULL;
                    }
                    cekHere("::::: $comName ::::: $srcGateName :::::");


                    echo __LINE__ . " sub $cCtr component #$it: $comName, sending values**** <br>";

                    if ($comName != NULL) {
//cekHere(":: $comName ::");
                        $mdlName = "Com" . ucfirst($comName);
                        $this->load->model("Coms/" . $mdlName);
                        $m = new $mdlName();

                        if (isset($tmpOutParams[$cCtr]) && sizeof($tmpOutParams[$cCtr]) > 0) {
                            $tobeExecuted = true;
                        }
                        else {
                            $tobeExecuted = false;
                        }

                        if ($tobeExecuted) {
                            $m->pair($tmpOutParams[$cCtr]) or die("Tidak berhasil memasang  values pada komponen: $comName/" . $jenisTrMaster . "/" . __FUNCTION__ . "/" . __LINE__);
                            $m->exec() or die("Gagal saat berusaha  exec values pada komponen: $comName/" . $jenisTrMaster . "/" . __FUNCTION__ . "/" . __LINE__);
                        }
                        else {
                            cekBiru("sub-komponem $comName tidak memenuhi syarat untuk ditulis");
                        }

                    }
                }

                cekMerah("HAHAHA");
                $pakai_ini = 0;
                if ($pakai_ini == 1) {
                    // region baca jurnal rekening besar
                    $jn = New ComJurnal();
                    $jn->addFilter("transaksi_id='$transaksiID'");
                    $jnTmp = $jn->lookupAll()->result();
//                    arrPrint($jnTmp);
                    $arrJurnal = array();
                    if (sizeof($jnTmp) > 0) {
                        foreach ($jnTmp as $ii => $spec) {
                            $defPosition = detectRekDefaultPosition($spec->rekening);
                            switch ($defPosition) {
                                case "debet":
                                    $arrJurnal[$spec->cabang_id][$spec->rekening] = $spec->debet > 0 ? $spec->debet : $spec->kredit * -1;
                                    break;
                                case "kredit":
                                    $arrJurnal[$spec->cabang_id][$spec->rekening] = $spec->kredit > 0 ? $spec->kredit : $spec->debet * -1;
                                    break;
                                default:
                                    mati_disini("tidak menemukan default posisi rekening...");
                                    break;
                            }
                        }
                    }
                    // endregion

                    cekHere("cetak array jurnal");
                    arrPrint($arrJurnal);

                    cekHere("cetak rek loop");
                    arrPrint($arrRekeningLoop);


                    if (sizeof($arrJurnal) > 0) {
                        if (sizeof($arrRekeningLoop) > 0) {
                            foreach ($arrRekeningLoop as $cabang_id => $loopSpec) {
                                foreach ($loopSpec as $rekening => $rekValue) {
                                    if (array_key_exists($rekening, $arrJurnal[$cabang_id])) {
                                        if (floor($rekValue) != floor($arrJurnal[$cabang_id][$rekening])) {
                                            mati_disini("nilai $rekening, jurnal: " . floor($arrJurnal[$cabang_id][$rekening]) . ", akumulasi pembantu: " . floor($rekValue));
                                        }
                                        else {
                                            cekHijau(":: COCOK ::");
                                        }
                                    }
                                }
                            }
                        }
                    }


                }


                // validasi rekening besar vs rekening pembantu
                validateBalancesComparison($trTmpCabangID, $componentGate, $componentConfig, "detail", $transaksiID, $tmpNomorNota);

            }
            else {
                cekMerah("subcomponents [detail] is not set");
            }

            arrPrint($iteratorMaster);
            if (sizeof($iteratorMaster) > 0) {
                $compValidators = ($this->config->item('transaksi_value_required_components') != null) ? $this->config->item('transaksi_value_required_components') : array();
                $componentConfig['master'] = $iteratorMaster;
                $cCtr = 0;
                foreach ($iteratorMaster as $cCtr => $tComSpec) {
                    $cCtr++;
                    $comName = $tComSpec['comName'];
                    if (substr($comName, 0, 1) == "{") {
                        $comName = trim($comName, "{");
                        $comName = trim($comName, "}");
                        $comName = str_replace($comName, $registryGates[$srcGateName][$comName], $comName);
                    }
                    $srcGateName = $tComSpec['srcGateName'];
                    $srcRawGateName = $tComSpec['srcRawGateName'];
                    echo "component # $cCtr: $comName<br>";

                    $dSpec = $registryGates[$srcGateName];
                    $tmpOutParams = array();
                    if (isset($tComSpec['loop'])) {
                        foreach ($tComSpec['loop'] as $key => $value) {
                            if (substr($key, 0, 1) == "{") {
                                $key = trim($key, "{");
                                $key = trim($key, "}");
                                $key = str_replace($key, $registryGates[$srcGateName][$key], $key);
                            }
                            $realValue = makeValue($value, $registryGates[$srcGateName], $registryGates[$srcGateName], 0);
                            $tmpOutParams['loop'][$key] = $realValue;
                        }
                    }
                    if (isset($tComSpec['static'])) {
                        foreach ($tComSpec['static'] as $key => $value) {

                            $realValue = makeValue($value, $registryGates[$srcGateName], $registryGates[$srcGateName], 0);
                            $tmpOutParams['static'][$key] = $realValue;

                        }
                        if (!isset($tmpOutParams['static']["transaksi_id"])) {
                            $tmpOutParams['static']["transaksi_id"] = $insertID;
                        }
                        if (!isset($tmpOutParams['static']["transaksi_no"])) {
                            $tmpOutParams['static']["transaksi_no"] = $insertNum;
                        }
                        $tmpOutParams['static']["urut"] = $cCtr;
                        $tmpOutParams['static']["fulldate"] = $fulldate;
                        $tmpOutParams['static']["dtime"] = $dtime;
                        $tmpOutParams['static']["keterangan"] = $configUi['steps'][$stepNumber]['label'] . " nomor " . $tmpNomorNota . " oleh " . $olehNama;


                    }

                    if (isset($tComSpec['static2'])) {
                        //cekHere("DISINI OIII");
                        foreach ($tComSpec['static2'] as $key => $value) {

                            $realValue = makeValue($value, $registryGates[$srcGateName][$cCtr], $registryGates[$srcGateName][$cCtr], 0);
                            $tmpOutParams['static2'][$key] = $realValue;

                        }
                        if (!isset($tmpOutParams['static2']["transaksi_id"])) {
                            $tmpOutParams['static2']["transaksi_id"] = $insertID;
                        }
                        if (!isset($tmpOutParams['static2']["transaksi_no"])) {
                            $tmpOutParams['static2']["transaksi_no"] = $insertNum;
                        }

                        $tmpOutParams['static2']["fulldate"] = $fulldate;
                        $tmpOutParams['static2']["dtime"] = $dtime;
                        $tmpOutParams['static2']["keterangan"] = $configUi['steps'][$stepNumber]['label'] . " nomor " . $tmpNomorNota . " oleh " . $olehNama;


                    }


                    $mdlName = "Com" . ucfirst($comName);
                    $this->load->model("Coms/" . $mdlName);
                    $m = new $mdlName();

                    //===filter value nol, jika harus difilter
                    $tobeExecuted = true;

                    if (in_array($mdlName, $compValidators)) {

                        $loopParams = isset($tmpOutParams['loop']) ? $tmpOutParams['loop'] : array();
                        if (sizeof($loopParams) > 0) {
                            foreach ($loopParams as $key => $val) {
                                cekmerah("$comName : $key = $val ");
                                if ($val == 0) {
                                    unset($tmpOutParams['loop'][$key]);
                                }
                            }
                        }
                        if (sizeof($tmpOutParams['loop']) < 1) {
                            $tobeExecuted = false;
                        }

                    }

                    if ($tobeExecuted) {
                        $m->pair($tmpOutParams) or die("Tidak berhasil memasang  values pada komponen: $comName/" . $this->jenisTr . "/" . __FUNCTION__ . "/" . __LINE__);
                        $m->exec() or die("Gagal saat berusaha  exec values pada komponen: $comName/" . $this->jenisTr . "/" . __FUNCTION__ . "/" . __LINE__);
                    }

                    $componentGate['master'][$cCtr] = $tmpOutParams;
                }
            }
            else {
                cekHitam("TIDAK ADA CORE MASTER");
            }


            //endregion


            $stopDate = dtimeNow();


            cekHitam("--- MULAI VALIDATOR ---");
            $this->load->library("Validator");
            $vdt = New Validator();
//            $vdt->validateMasterDetail($trID_cli, $componentConfig['master'], $componentConfig['detail']);

            mati_disini("...cek MANUAL cli transaksi... rekening pembantu masuk disini (component detail)<br>start: $startDate<br>stop: $stopDate<br>butuh waktu: " . timeDiff($startDate, $stopDate));

//            if ($getTrID > 0) {
//                mati_disini("...cek MANUAL cli transaksi... rekening pembantu masuk disini (component detail)<br>start: $startDate<br>stop: $stopDate<br>butuh waktu: " . timeDiff($startDate, $stopDate));
//            }


            cekHijau("...tes cli transaksi... rekening pembantu masuk disini (component detail)<br>start: $startDate<br>stop: $stopDate<br>butuh waktu: " . timeDiff($startDate, $stopDate));
//            mati_disini("...tes cli transaksi... rekening pembantu masuk disini (component detail)<br>start: $startDate<br>stop: $stopDate<br>butuh waktu: " . timeDiff($startDate, $stopDate));


            $this->db->trans_complete() or die("Gagal saat berusaha  commit transaction!");
        }
        else {
            $stopDate = dtimeNow();
            cekMerah(":: TIDAK ADA yang perlu di-CLI-kan ::
                    <br>start: $startDate<br>stop: $stopDate<br>butuh waktu: " . timeDiff($startDate, $stopDate));
        }

    }

    // patch insert ke tabel transaksi_efaktur
    public function run_patchFaktur()
    {
        $this->load->model("MdlTransaksi");
        $t = new MdlTransaksi();
        $t->setfilters(array());
        $t->addFilter("link_id='0'");
        $t->addFilter("trash_4='0'");
        $t->addFilter("jenis in ('110')");
        $t->addFilter("gunggungan_mode='1'");
        $tTmp = $t->lookupJoined_OLD()->result();
        showLast_query("kuning");
        cekHere(count($tTmp));

        $this->db->trans_start();


        foreach ($tTmp as $spec) {
//            arrPrint($spec);
            $data = array(
                "transaksi_id" => $spec->transaksi_id,
                "nomer" => $spec->nomer,
                "dtime" => $spec->dtime,
                "oleh_id" => $spec->oleh_id,
                "oleh_nama" => $spec->oleh_nama,
                "produk_id" => $spec->sub_referensi_id_4,
                "produk_nama" => $spec->sub_referensi_nama_4,
                "pihak_id" => $spec->sub_pihak_id,
                "pihak_nama" => $spec->sub_pihak_nama,
                "efaktur" => $spec->efaktur,
                "date_faktur" => $spec->efaktur_dtime,
                "jumlah" => 1,
            );
            $this->db->insert('transaksi_efaktur', $data);
            showLast_query("hijau");
//            break;
        }


//        mati_disini("...cek MANUAL cli transaksi... ");
        $this->db->trans_complete() or mati_disini("Gagal saat berusaha  commit transaction!");

    }
    public function run_patchFakturUpdate()
    {
        $this->load->model("MdlTransaksi");
        $t = new MdlTransaksi();
        $t->setfilters(array());
        $t->addFilter("link_id='0'");
        $t->addFilter("trash_4='1'");
        $t->addFilter("jenis in ('110')");
//        $t->addFilter("gunggungan_mode='1'");
        $tTmp = $t->lookupAll()->result();
        showLast_query("kuning");
        cekHere(count($tTmp));

        $this->db->trans_start();


        foreach ($tTmp as $spec) {
//            $data = array(
//                "transaksi_id" => $spec->transaksi_id,
//                "nomer" => $spec->nomer,
//                "dtime" => $spec->dtime,
//                "oleh_id" => $spec->oleh_id,
//                "oleh_nama" => $spec->oleh_nama,
//                "produk_id" => $spec->sub_referensi_id_4,
//                "produk_nama" => $spec->sub_referensi_nama_4,
//                "pihak_id" => $spec->sub_pihak_id,
//                "pihak_nama" => $spec->sub_pihak_nama,
//                "efaktur" => $spec->efaktur,
//                "date_faktur" => $spec->efaktur_dtime,
//                "jumlah" => 1,
//            );
//            $this->db->insert('transaksi_efaktur', $data);
//            showLast_query("hijau");
            $where = array(
                "transaksi_id" => $spec->id,
            );
            $this->db->where($where);
            $tmp = $this->db->get('transaksi_efaktur')->result();
            showLast_query("biru");
            if(sizeof($tmp)>0){
                $data_update = array(
                    "jumlah" => "0",
                );
                $this->db->where('transaksi_id', $spec->id);
                $this->db->update('transaksi_efaktur', $data_update);
                showLast_query("orange");
            }

//            break;
        }


        mati_disini("...cek MANUAL cli transaksi... ");
        $this->db->trans_complete() or mati_disini("Gagal saat berusaha  commit transaction!");

    }

}


