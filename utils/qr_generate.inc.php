<?php
class qr_generate {
    public static function show_qr($id_factura) {
        require_once('C:\xampp\htdocs\proyectos\FRAMEWORK_CITYHOUSE\phpqrcode\qrlib.php');

        $data = 'http://localhost/proyectos/FRAMEWORK_CITYHOUSE/pdfs_and_qr/pdf/factura_' . $id_factura . '.pdf';
        
        $eccLevel = 'L';    
        $size = 4;
        $margin = 4;
        $qrFolderPath = 'C:\xampp\htdocs\proyectos\FRAMEWORK_CITYHOUSE\pdfs_and_qr\qr\\';
        $pngFileName = 'myqrcode_' . $id_factura . '.png';
        $pngAbsoluteFilePath = $qrFolderPath . $pngFileName;
        
        try {
            QRcode::png($data, $pngAbsoluteFilePath, $eccLevel, $size, $margin);
            echo 'QR code generated successfully!';
        } catch (Exception $e) {
            echo 'Error generating QR code: ' . $e->getMessage();
        }
    }
}

