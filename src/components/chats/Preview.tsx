"use client";
import React, { useEffect, useState } from "react";
import { pdf, Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { flexDirection: "row", backgroundColor: "#E4E4E4" },
  section: { margin: 10, padding: 10, flexGrow: 1 },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify'
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
});

const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>La casa de papel</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, laudantium, expedita enim molestiae, quas voluptate ad doloremque cumque veritatis magnam officia sint voluptatum obcaecati amet quibusdam. Voluptas facilis quod doloremque? Placeat corrupti architecto assumenda, unde quo esse. Debitis omnis velit tempora libero iusto minus, eius voluptatem eligendi rerum et provident ad officia voluptatum consequatur sequi qui fugiat cupiditate quisquam cum ipsam laboriosam laudantium enim minima quis. Atque temporibus quam repudiandae est odit ducimus quaerat voluptatibus modi voluptas in. Fuga magnam unde maxime totam ipsam ratione assumenda id quia. Molestiae quod repudiandae ratione ducimus soluta porro suscipit voluptatem saepe magni quaerat iste nulla dolorem, quidem at maiores, impedit odit sit recusandae, illo nobis vitae sapiente maxime? Aspernatur, officia assumenda a in soluta dolore reiciendis rerum at tempora quibusdam nam quis nemo neque, cum earum id commodi iusto amet recusandae ipsam sunt voluptas iure temporibus perspiciatis. Libero numquam nemo, perspiciatis sint dolore maiores. Facilis id omnis quisquam eaque! Quaerat veniam, nulla vel perspiciatis distinctio enim perferendis facilis repudiandae quam adipisci! Labore omnis recusandae officia ullam provident ea voluptas facere accusantium exercitationem asperiores distinctio sequi perspiciatis nihil libero doloribus voluptates harum explicabo quisquam, animi laudantium minus fugiat necessitatibus quibusdam adipisci. Veritatis ab mollitia, ducimus numquam ratione consectetur aperiam quos iure dolorum dignissimos placeat rerum repudiandae fugiat, laudantium eum cum iusto dolorem amet sint illo illum vel nulla quis? Alias placeat harum debitis optio voluptas quis similique nesciunt itaque delectus. Dicta itaque aliquam ullam maiores porro ipsam eveniet accusantium facere odit earum numquam tempora ex officiis nemo, culpa unde autem odio optio repudiandae delectus? Rem placeat nostrum commodi enim atque exercitationem sunt, deserunt libero, veniam aliquam earum quos, facere totam explicabo quis. Itaque, provident doloribus deserunt atque quas molestias minus quae repellendus sequi fugit temporibus deleniti. Inventore, quos ad libero nisi architecto iusto rem facere quasi consequatur, voluptatibus itaque. Quasi, quis veniam. Modi autem cupiditate, molestiae, suscipit, similique accusamus earum expedita illo aperiam vitae explicabo pariatur magnam nostrum vel. Voluptatum vitae, inventore doloremque, mollitia quae laborum impedit doloribus dignissimos eaque porro ea sequi quaerat tempore deserunt. Doloremque, ducimus exercitationem nobis tempore, consequatur atque cumque aut dolorum, quam placeat amet. Quis voluptas eligendi non. Rerum, debitis repudiandae! Eos perferendis earum voluptatem! Suscipit ipsa dolor eaque officiis cumque, magnam animi atque similique enim sapiente nobis fugiat expedita excepturi quae amet aperiam reiciendis iure repellat nam vitae, hic eveniet nostrum sequi ad. Eos quam omnis, rem consectetur nisi sint magnam adipisci animi similique est doloremque sapiente tenetur natus voluptate, maxime dignissimos sed officiis excepturi error necessitatibus eius cum totam. Quidem expedita omnis rem sunt facere veritatis error architecto reiciendis. Expedita, laborum reiciendis hic aut veniam quam rerum blanditiis iste labore eius eum natus exercitationem, eveniet dolor consectetur? Maiores suscipit blanditiis eius laudantium quia minima id exercitationem veritatis ipsam! Aspernatur impedit recusandae aliquid, officiis odio necessitatibus ad ipsum rerum accusamus dolorum repellendus facere vero iure tempore commodi nam, dolorem cum consequatur nostrum quisquam animi asperiores qui iusto quibusdam? Reprehenderit sequi perspiciatis temporibus officia aliquam asperiores deleniti aspernatur ratione.</Text>
      </View>
    </Page>
  </Document>
);

export default function Preview() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const generatePdf = async () => {
      try {
        const blob = await pdf(<MyDocument />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (error) {
        console.error("Error al generar el PDF:", error);
      }
    };

    generatePdf();

    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [isClient]);

  if (!isClient) return <p>Cargando...</p>;

  return (
    <div>
      {pdfUrl ? (
        <>
          <iframe src={pdfUrl} style={{ width: "100%", height: "85vh", border: "1px solid #ccc" }} title="Vista previa del PDF" />
        </>
      ) : (
        <p>Generando PDF...</p>
      )}
    </div>
  );
}
