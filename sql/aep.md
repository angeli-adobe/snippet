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
