SELECT min(timestamp), max(timestamp)
FROM glassbox_prod



SELECT _unipol.identification.ecid
FROM unipolsai_app_prod_midvalues
WHERE _unipol.identification.ecid is not null



SELECT DATE(timestamp), count(*)
FROM glassbox_prod
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) desc


-- Mobile app
SELECT DATE(timestamp), count(*)
FROM unipolsai_app_prod_midvalues
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) desc;

-- Website
SELECT DATE(timestamp), count(*)
FROM unipolsai_it_web_prod_midvalues
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) desc;

-- PUA
SELECT DATE(timestamp), count(*)
FROM unico_agenzia_prod_midvalues
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) desc;


SELECT DATE(timestamp) AS giorno,
       COUNT(endUserIDs._experience.mcid.id) AS righe_con_id,
       COUNT(*) AS all_data,
       COUNT(*) - COUNT(endUserIDs._experience.mcid.id) as righe_senza_id,
      (COUNT(*) - COUNT(endUserIDs._experience.mcid.id)) /COUNT(*) as righe_senza_id_perc
FROM unipolsai_app_prod_midvalues
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) DESC;

SELECT DATE(timestamp) AS giorno,
       COUNT(_unipol.identification.hashedEmail) AS righe_con_id,
       COUNT(*) AS all_data,
       COUNT(*) - COUNT(_unipol.identification.hashedEmail) as righe_senza_id,
      (COUNT(_unipol.identification.hashedEmail)) /COUNT(*) as righe_con_id_perc
FROM unipolsai_it_web_prod_midvalues
GROUP BY DATE(timestamp)
ORDER BY DATE(timestamp) DESC;


INSERT INTO
    glassbox_test_join
SELECT
    t._id,
    t.timestamp,
    struct(
        struct(
            t.ecid as ecid,
            t.crmid as crmId
        ) identification,
        struct(
            t.actionVisualName as actionVisualName,
            t.cookieCls as cookieCls,
            t.domValue as domValue,
            t.joinId as joinId,
            t.uri as uri
        ) struggleDetails
    ) _unipol
FROM
    v_glassbox AS t;
