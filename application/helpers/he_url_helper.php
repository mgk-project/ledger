<?php
/**
 * Created by thomas Maya Graha Kencana.
 * Date: 12/04/18
 * Time: 20:30
 */
define('MODUL_URL', base_url() . url_segment(1) . "/" . url_segment(2) . "/" . url_segment(3));
define('MODUL_PATH', base_url() . url_segment(1) . "/");
define('MODUL_CONFIG_PATH', "../../modules/" . url_segment(1) . "/config/");
define('MODUL_TEMPLATE_PATH', "application/modules/" . url_segment(1) . "/");
define('MODUL_TEMPLATE_ASSETS', "application/modules/" . url_segment(1) . "/assets");
define('MGK_LIVE', '202.65.117.72');

function url_segment($key = "")
{
    //    return "kekeke $key";
    $ci = &get_instance();
    if ($key == "") {
        return $ci->uri->segment_array();
    }
    else {

        return $ci->uri->segment($key);
    }
}

function modul()
{
    return url_segment(1);
}

function url_cleanup($url_e)
{
    $var = str_replace("=", "", $url_e);
    return $var;
}

function url_referer()
{
    if (isset($_SERVER['HTTP_REFERER'])) {
        return $_SERVER['HTTP_REFERER'];
    }
}

function my_host(){

    return $_SERVER['HTTP_HOST'];
}
function ipadd()
{
    return $_SERVER['REMOTE_ADDR'];
}

function local_version()
{
    return "VII.0702.2025.Ev";
}

function cdn_upload_images()
{
    return "https://cdn.mayagrahakencana.com/images/Upload/files";
}
function cdn_upload_document()
{
    return "https://cdn.mayagrahakencana.com/images/Upload/document";
}

function cdn_suport()
{
    return "https://cdn.mayagrahakencana.com/assets/suport/";
}

function local_suport()
{
    return base_url() . "assets/";
}

function img_produk()
{
    return base_url() . "public/images/produks/";
}

function img_profile()
{
    return base_url() . "public/images/profiles";
}

function img_sys()
{
    return base_url() . "public/images/sys";
}

function img_profile_default()
{
    return img_profile() . "/profile-default.png";
}

function img_blank()
{
    // return base_url(). "assets/images/img_blank.gif";
    return base_url() . "public/images/produks/img_blank.png";
}

function img_maintenace()
{
    // return base_url(). "assets/images/img_blank.gif";
    return base_url() . "public/images/sys/under-maintenance.png";
}

function img_bitzer()
{
    // return base_url(). "assets/images/img_blank.gif";
    return base_url() . "public/images/sys/bitzer.png";
}

function img_loading_muntir()
{

    return base_url() . "public/images/sys/load_muntir.gif";
}

function url_sanhistory()
{
    return "https://sanhistory.mayagrahakencana.com/";
    // return "http://demo.mayagrahakencana.com/san/";
}

function img_logo_header()
{

    return img_profile() . "/logo_header.png";
}

function img_logo_header_full()
{

    return img_profile() . "/logo_header_full.png";
}

function img_favicon()
{

    return img_profile() . "/favicon.ico";
}

//function url_sanhistory()
//{
//    return "https://sanhistory.mayagrahakencana.com/";
//    // return "http://demo.mayagrahakencana.com/san/";
//}

function upload_image($files)
{
    // $files = $_FILES['file'];

    $request = curl_init(cdn_upload_images());
    $realpath = realpath($files['tmp_name']);
    curl_setopt($request, CURLOPT_POST, true);
    $fields = array(
        //        'file'          => "@".$realpath.";filename=".$files['name'].";type=".$files['type'],
        'file'          => new \CurlFile($realpath, $files['type'], $files['name']),
        'server_source' => $_SERVER['HTTP_HOST'],
    );
    curl_setopt($request, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    $cUrl_result = json_decode(curl_exec($request));
    curl_close($request);

    return $cUrl_result;


    /* =========================
    $url_img = $cUrl_result->full_url;
    // ========================= */
}
function upload_document($files)
{
    // $files = $_FILES['file'];

    $request = curl_init(cdn_upload_document());
    $realpath = realpath($files['tmp_name']);
    curl_setopt($request, CURLOPT_POST, true);
    $fields = array(
        //        'file'          => "@".$realpath.";filename=".$files['name'].";type=".$files['type'],
        'file'          => new \CurlFile($realpath, $files['type'], $files['name']),
        'server_source' => $_SERVER['HTTP_HOST'],
    );
    curl_setopt($request, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($request, CURLOPT_RETURNTRANSFER, true);
    $cUrl_result = json_decode(curl_exec($request));
    curl_close($request);

    return $cUrl_result;


    /* =========================
    $url_img = $cUrl_result->full_url;
    // ========================= */
}

function download_tpl($tpl_name)
{
    $vars = array(
        "customer"  => "tpl_konsumen.xlsx",
        "produk"    => "tpl_produk.xlsx",
        "bahan"     => "tpl_bahan_baku.xlsx",
        "komposisi" => "tpl_produk_komposisi_resep.xlsx",
    );
    $tpl_file = $vars[$tpl_name];

    return base_url() . "download/$tpl_file";
}

function img_working()
{
    return base_url() . "public/images/sys/the-Lumber-jack.gif";
}

function hapus_file($directory, $umur_file){
    $files = glob($directory . '/*');

    // arrPrint($files);
    // matiDisini(__LINE__);
    // Waktu saat ini
    $currentTime = time();

    $str_log = "";
    if(is_array($files)){
        // Loop melalui setiap file
        foreach ($files as $file_name) {
            // Periksa apakah item adalah file (bukan direktori)
            if (is_file($file_name)) {
                // Dapatkan waktu modifikasi terakhir file
                $fileModificationTime = filemtime($file_name);
                // Hitung selisih waktu antara sekarang dan waktu modifikasi terakhir file
                $timeDifference = $currentTime - $fileModificationTime;
                $umurMaximal = ($umur_file * 24 * 60 * 60);
                // cekHijau("$fileModificationTime $file_name $currentTime || $timeDifference // $umurMaximal");
                // Jika file sudah berumur lebih dari 16 hari (2 hari * 24 jam * 60 menit * 60 detik)
                if ($timeDifference > ($umurMaximal)) {
                    // Hapus file
                    unlink($file_name);
                    // echo "File $file_name telah dihapus.\n<br>";
                    $str_log .= "$file_name dihapus  \n";
                }
                else{
                    // $str_log .= "$file_nama Tidak dihapus \n";
                }
            }
        }
    }
    else{
        $str_log = "file dlam $directory tidak terbaca \n";
    }

    return $str_log;
}