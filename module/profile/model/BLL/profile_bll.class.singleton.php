<?php
class profile_bll {
    private $dao;
    private $db;
    static $_instance;

    function __construct() {
        $this->dao = profile_dao::getInstance();
        $this->db = db::getInstance();
    }

    public static function getInstance() {
        if (!(self::$_instance instanceof self)) {
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    
    function get_load_factura_BLL($username) {
        return $this->dao->select_factura_user_DAO($this->db, $username);
    }

    public function get_generate_pdf_factura_BLL($id_factura) {
        $data = $this->dao->select_generate_pdf_factura_DAO($this->db, $id_factura);
    
        if ($data) {
            require_once 'utils/vendor/autoload.php';
        
            $pdf = new TCPDF();
        
            $pdf->SetCreator(PDF_CREATOR);
            $pdf->SetAuthor('Your Name');
            $pdf->SetTitle('Factura #' . $id_factura);
            $pdf->SetSubject('Factura');
            $pdf->SetKeywords('TCPDF, PDF, factura');
        
            $pdf->AddPage();
        
            $pdf->SetFont('helvetica', '', 12);
        
            $precio_total_factura = 0;
            foreach ($data as $item) {
                $precio_total_factura += $item['cant'] * $item['price'];
            }
        
            $html = '<table border="1">';
            $html .= '<tr><th colspan="4">Factura #' . $id_factura . '</th></tr>';
            $html .= '<tr><td colspan="4">Num Factura #' . $id_factura . '</td></tr>';
            $html .= '<tr><td colspan="4">Precio Total: € ' . number_format($precio_total_factura, 2, ',', '.') . '</td></tr>';
            $html .= '<tr><td colspan="4">Estado: Comprado</td></tr>';
            $html .= '<tr><th>Tipo Vivienda</th><th>Cantidad</th><th>Precio unitario</th><th>Precio por línea</th></tr>';
        
            foreach ($data as $item) {
                $precio_por_linea = $item['cant'] * $item['price'];
                $html .= '<tr>';
                $html .= '<td>' . $item['tipo'] . ' en ' . $item['name_city'] . '</td>';
                $html .= '<td>' . $item['cant'] . '</td>';
                $html .= '<td>€ ' . number_format($item['price'], 2, ',', '.') . '</td>';
                $html .= '<td>€ ' . number_format($precio_por_linea, 2, ',', '.') . '</td>';
                $html .= '</tr>';
            }
        
            $html .= '</table>';
        
            $pdf->writeHTML($html, true, false, true, false, '');
        
            $pdfPath = 'D:\\xampp\\htdocs\\proyectos\\FRAMEWORK_CITYHOUSE\\pdfs_and_qr\\pdf\\factura_' . $id_factura . '.pdf';
            $pdf->Output($pdfPath, 'F');
        
            return ['status' => 'success', 'url' => $pdfPath];
        } else {
            return ['status' => 'error'];
        }
    }
    

    
}
?>
