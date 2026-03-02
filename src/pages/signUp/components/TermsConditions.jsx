import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

const TermsConditions = ({ showTCModal, setShowTCModal }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Dialog
      open={showTCModal}
      onClose={() => setShowTCModal(false)}
      fullWidth
      maxWidth="md"
      aria-labelledby="tnc-privacy-dialog-title"
    >
      <DialogTitle
        sx={{
          pr: { xs: 1, sm: 4 },
          pl: { xs: 2, sm: 3 },
          pt: { xs: 1.5, sm: 2 },
          pb: 0,
        }}
        id="tnc-privacy-dialog-title"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: { xs: 1, sm: 2 },
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1rem", sm: "1.25rem" },
            }}
          >
            Terms & Privacy
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setShowTCModal(false)}
            size="small"
            sx={{ ml: 1 }}
          >
            <CloseIcon sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }} />
          </IconButton>
        </Box>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            minHeight: { xs: 40, sm: 48 },
            "& .MuiTab-root": {
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
              minHeight: { xs: 40, sm: 48 },
              padding: { xs: "6px 8px", sm: "12px 16px" },
              textTransform: "none",
            },
          }}
        >
          <Tab label="Privacy Policy" />
          <Tab label="Terms & Conditions" />
        </Tabs>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          maxHeight: "65vh",
          overflowY: "auto",
          py: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 },
        }}
      >
        {tabValue === 0 && (
          <Box>
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                Nipenikupe App Privacy Policy
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mb: 2,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                }}
              >
                Effective Date: 22 October 2025
              </Typography>
              <Typography variant="body1" paragraph>
                Nipenikupe (“we”, “us”, “our”) is committed to protecting your
                privacy and handling your personal data in accordance with the
                Data Protection Act, 2019 (Kenya). This Privacy Policy explains
                how we collect, use, store, and protect your information.
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              1. Information We Collect
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Personal details: Name, email address, phone number, age, gender." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Profile information: Skills offered, skills sought, profile photo, biography." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Usage data: App activity, messages, feedback, and transaction history." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Device information: IP address, device type, operating system, and browser type." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Location data: If you enable location services." />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              2. How We Use Your Information
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Create and manage your account." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Facilitate skill-sharing and barter transactions." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Communicate with you about your account or activity." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Improve our services and user experience." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ensure security and prevent fraud." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Comply with legal obligations." />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              3. Legal Basis for Processing
            </Typography>
            <Typography paragraph>
              We process your personal data based on: your consent; the
              necessity to perform a contract with you; compliance with legal
              obligations; and our legitimate interests (e.g., improving our
              services).
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              4. Sharing Your Information
            </Typography>
            <Typography paragraph>
              We may share your information with other users (as necessary for
              skill exchanges), service providers who help us operate the
              platform (under strict confidentiality), and law enforcement or
              regulatory authorities if required by law. We do NOT sell your
              personal data to third parties.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              5. Data Security
            </Typography>
            <Typography paragraph>
              We implement appropriate technical and organisational measures to
              protect your data from unauthorised access, loss, or misuse.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              6. Data Retention
            </Typography>
            <Typography paragraph>
              We retain your personal data only as long as necessary for the
              purposes described in this policy or as required by law.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              7. Your Rights
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Access your personal data." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Request correction or deletion of your data." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Object to or restrict processing." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Withdraw consent at any time." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Request data portability." />
              </ListItem>
            </List>
            <Typography paragraph>
              To exercise your rights, contact us at: [Insert Contact
              Email/Address].
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              8. Children’s Privacy
            </Typography>
            <Typography paragraph>
              We do not knowingly collect personal data from children under 18
              without parental or guardian consent.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              9. International Data Transfers
            </Typography>
            <Typography paragraph>
              If we transfer your data outside Kenya, we will ensure adequate
              safeguards are in place as required by law.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              10. Changes to This Policy
            </Typography>
            <Typography paragraph>
              We may update this Privacy Policy from time to time. We will
              notify you of significant changes and indicate the effective date
              at the top of the policy.
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mt: 1 }}>
              11. Contact Us
            </Typography>
            <Typography paragraph>
              If you have any questions or concerns about this Privacy Policy or
              your data, please contact us at: [Insert Contact Email/Address].
            </Typography>
          </Box>
        )}

        {tabValue === 1 && (
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 1,
                fontSize: { xs: "1rem", sm: "1.25rem" },
              }}
            >
              Nipenikupe – Terms and Conditions – V1.0 (22 October 2025)
            </Typography>
            <Typography paragraph>
              1. Acceptance of Terms: By registering for and using Nipenikupe,
              you agree to abide by these Terms and Conditions and any future
              updates.
            </Typography>
            <Typography paragraph>
              2. Eligibility: You must be at least 18 years old (or the legal
              age in your jurisdiction) to use the platform.
            </Typography>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              3. User Accounts
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="You are responsible for maintaining the confidentiality of your account credentials." />
              </ListItem>
              <ListItem>
                <ListItemText primary="You agree to provide accurate and up-to-date information." />
              </ListItem>
            </List>
            <Typography paragraph sx={{ fontWeight: "bold" }}>
              4. Skill Sharing and Barter
            </Typography>
            <Typography paragraph>
              i. Platform-Only Exchanges: All skill-sharing and barter
              transactions must be initiated, negotiated, and completed
              exclusively through the Nipenikupe platform. Users are strictly
              prohibited from arranging or conducting exchanges outside the
              platform.
            </Typography>
            <Typography paragraph>
              ii. Prohibition of Monetary Transactions: The Nipenikupe platform
              is designed solely for the exchange of skills and services on a
              barter basis. Users must not request, offer, or accept any form of
              monetary payment, including cash, mobile money, or bank transfers,
              in connection with any skill exchange arranged through the
              platform.
            </Typography>
            <Typography paragraph>
              iii. Accurate Skill Descriptions: Users are required to provide
              honest, clear, and accurate descriptions of the skills or services
              they offer and those they seek. Misrepresentation of skills,
              qualifications, or experience is strictly prohibited and may
              result in suspension or termination of your account.
            </Typography>
            <Typography paragraph>
              iv. Commitment to Agreements: By agreeing to a skill exchange,
              users commit to fulfilling their part of the arrangement to the
              best of their ability and within the agreed timeframe. Repeated
              failure to honour agreements may result in account suspension.
            </Typography>
            <Typography paragraph>
              v. No Unauthorised Commercial Activity: Users must not use the
              platform to promote, advertise, or solicit for any commercial
              services, products, or businesses unrelated to skill sharing and
              barter.
            </Typography>
            <Typography paragraph>
              vi. Reporting Violations: Users are encouraged to report any
              attempts to circumvent the platform, requests for payment, or
              other violations of these terms using the in-app reporting tools.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              5. Prohibited Conduct
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="Do not share personal contact information (e.g., phone numbers, emails, social media) within the app." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Do not use the platform for illegal, harmful, or offensive activities." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Do not attempt to circumvent the platform’s communication or exchange systems." />
              </ListItem>
            </List>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              6. Content and Communication
            </Typography>
            <List dense>
              <ListItem>
                <ListItemText primary="You are responsible for all content you post or share." />
              </ListItem>
              <ListItem>
                <ListItemText primary="Do not post false, misleading, or inappropriate content." />
              </ListItem>
              <ListItem>
                <ListItemText primary="The platform may monitor communications to enforce these terms." />
              </ListItem>
            </List>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              7. Privacy
            </Typography>
            <Typography paragraph>
              {" "}
              Your data will be handled in accordance with our Privacy Policy.
              Do not share others’ personal information without consent.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              8. Dispute Resolution
            </Typography>
            <Typography paragraph>
              Users are encouraged to resolve disputes amicably. The platform
              may intervene at its discretion but is not liable for user
              conduct.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              9. Termination
            </Typography>
            <Typography paragraph>
              The platform reserves the right to suspend or terminate accounts
              that violate these terms.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              10. Limitation of Liability
            </Typography>
            <Typography paragraph>
              The platform is not responsible for the outcome of skill exchanges
              or user conduct. Use the platform at your own risk.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              11. Changes to Terms
            </Typography>
            <Typography paragraph>
              Terms may be updated from time to time. Continued use constitutes
              acceptance of changes.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              12. Intellectual Property
            </Typography>
            <Typography paragraph>
              All content posted by users remains the property of the respective
              user. By posting, you grant Nipenikupe a non-exclusive,
              royalty-free, worldwide licence to use such content for operating
              and promoting the platform.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              13. Indemnity
            </Typography>
            <Typography paragraph>
              You agree to indemnify, defend, and hold harmless Nipenikupe, its
              affiliates, officers, directors, employees, and agents from claims
              arising out of your use of the platform.
            </Typography>

            <Typography paragraph sx={{ fontWeight: "bold" }}>
              14. Jurisdiction
            </Typography>
            <Typography paragraph>
              These Terms and Conditions are governed by and construed in
              accordance with the laws of Kenya. Any disputes shall be subject
              to the exclusive jurisdiction of the courts of Kenya.
            </Typography>

            <Typography paragraph sx={{ textAlign: "right", mt: 3 }}>
              xxxx – 22nd October 2025 - xxxxx
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2 } }}>
        <Button
          onClick={() => setShowTCModal(false)}
          sx={{
            color: "#0A6802",
            fontSize: { xs: "0.875rem", sm: "0.9375rem" },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TermsConditions;
