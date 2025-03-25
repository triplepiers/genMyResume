import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid2';
import { Input } from '@mui/material';
import { styled } from '@mui/material/styles';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export function HeadingForm() {
  return (
    <Grid container spacing={3}>
      <FormGrid size={{ xs: 12 }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: 30, fontWeight: 700 }}>Resume Heading</h1>
          <p>We suggest including an <b>email</b> and <b>phone number</b></p>
        </div>
      </FormGrid>
      {/* 姓名 */}
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="surname" required>
          Surname
        </FormLabel>
        <Input
          id="surname"
          name="surname"
          type="last-name"
          placeholder="e.g. Doe"
          autoComplete="last name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12, md: 6 }}>
        <FormLabel htmlFor="name" required>
          Name
        </FormLabel>
        <Input
          id="name"
          name="name"
          type="name"
          placeholder="e.g. John"
          autoComplete="first name"
          required
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 12 }}>
        <FormLabel htmlFor="profession">
          Profession
        </FormLabel>
        <Input
          id="profession"
          name="profession"
          type="profession"
          placeholder="e.g. Senior Sales Manager"
          autoComplete="Senior Sales Manager"
          size="small"
        />
      </FormGrid>
      {/* 地址 */}
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="city">
          City
        </FormLabel>
        <Input
          id="city"
          name="city"
          type="city"
          placeholder="e.g. Shenzhen"
          autoComplete="City"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="province">
          Province
        </FormLabel>
        <Input
          id="province"
          name="province"
          type="province"
          placeholder="e.g. Guangdong"
          autoComplete="Province"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="zip">
          Postcode
        </FormLabel>
        <Input
          id="postcode"
          name="postcode"
          type="postcode"
          placeholder="e.g. 518000"
          autoComplete="postal-code"
          size="small"
        />
      </FormGrid>
      {/*占位 */}
      <FormGrid size={{ xs: 6 }}></FormGrid>
      {/* 联系方式 */}
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="phone">
          Phone
        </FormLabel>
        <Input
          id="phone"
          name="phone"
          type="phone"
          placeholder="e.g. (45) 6789 0123"
          autoComplete="phoneNum"
          size="small"
        />
      </FormGrid>
      <FormGrid size={{ xs: 6 }}>
        <FormLabel htmlFor="email" required>
          Email
        </FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="e.g. joe_doe@email.com"
          autoComplete="emailAddr"
          required
          size="small"
        />
      </FormGrid>
    </Grid>
  );
}