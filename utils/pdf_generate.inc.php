<?php
require_once 'vendor/autoload.php';

class pdf_generator extends TCPDF {
    public function Header() {
        // Logo
        $image_file = K_PATH_IMAGES.'logo_example.png';
        $this->Image($image_file, 10, 10, 10, '', 'PNG', '', 'T', false, 200, '', false, false, 0, false, false, false);
        // Title
        $this->SetFont('helvetica', 'B', 20);
    }

    public function Footer() {
        $this->SetY(-15);
        $this->SetFont('helvetica', 'I', 8);
        $this->Cell(0, 10, 'Página '.$this->getAliasNumPage().' de '.$this->getAliasNbPages(), 0, false, 'C', 0, '', 0, false, 'T', 'M');
    }

    public static function generate_factura_pdf($id_factura, $data) {
        $pdf = new self();

        $pdf->SetCreator(PDF_CREATOR);
        $pdf->SetAuthor('Llorenç Alfonso Sanchis 1ºDAW');
        $pdf->SetTitle('Factura #' . $id_factura);
        $pdf->SetKeywords('TCPDF, PDF, factura');
        
        $pdf->AddPage();
        
        $pdf->SetFont('helvetica', '', 12);
        
        $precio_total_factura = 0;
        foreach ($data as $item) {
            $precio_total_factura += $item['cant'] * $item['price'];
        }
        $username = isset($data[0]['username']) ? $data[0]['username'] : 'Cliente Desconocido';
        $html = '
        <style>
            table {
                border-collapse: collapse;
                width: 100%;
                margin-bottom: 20px;
            }
            th {
                background-color: #4CAF50;
                color: white;
                padding: 8px;
                text-align: center;
            }
            td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: center;
            }
            tr:nth-child(even) {
                background-color: #f2f2f2;
            }
            tr:hover {
                background-color: #ddd;
            }
        </style>
        
        <h2 style="text-align:center;">Factura</h2>
        <table>
            <tr><th colspan="4">Factura #' . $id_factura . '</th></tr>
            <tr><td colspan="4">Num Factura #' . $id_factura . '</td></tr>
            <tr><td colspan="4">Precio Total: € ' . number_format($precio_total_factura, 2, ',', '.') . '</td></tr>
            <tr><td colspan="4">Estado: Comprado</td></tr>
            <tr><td colspan="4">Cliente: '.$username.'</td></tr>
            <tr><th>Tipo Vivienda</th><th>Cantidad</th><th>Precio unitario</th><th>Precio por línea</th></tr>';
        
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
        
        return $pdfPath;
    }
}
?>
