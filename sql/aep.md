### Join Account and Person dataset (B2B)
This query joins the Person table and the Account table, in a B2B scenario. 
The sourceAccountKey in the Person table is an array.

```sql
SELECT p.person.name.firstName, p.person.name.lastName, a.accountName
FROM demo_system_b2b_person_dataset AS p
INNER JOIN demo_system_b2b_account_dataset as a
ON p.personComponents.sourceAccountKey.sourceKey[0] = a.accountKey.sourceKey
LIMIT 10
```

### Get identities from Web Event Dataset (DSN)

```sql
SELECT _adobeamericaspot4.identification.core.email, _adobeamericaspot4.identification.core.ecid
FROM demo_system_event_dataset_for_website_global_v1_1
GROUP BY _adobeamericaspot4.identification.core.email, _adobeamericaspot4.identification.core.ecid
```
