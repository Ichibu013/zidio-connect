import AlertsPanel from "./Panels/AlertsPanel";
import ChangePasswordPanel from "./Panels/ChangePasswordPanel";
import ContactIInfoPanel from "./Panels/ContactIInfoPanel";
import DeleteAccountPanel from "./Panels/DeleteAccountPanel";
import NotificationPanel from "./Panels/NotificationPanel";
import PrivacyPanel from "./Panels/PrivacyPanel";

export default function AccountSettingsPage() {
  return (
    <>
      {/* Contact Information Panel Component */}
      <ContactIInfoPanel />
      <div className="my-4 border-t border-gray-200" />
      {/* Notification Settings Panel Component */}
      <NotificationPanel />
      <div className="my-4 border-t border-gray-200" />
      {/* Alerts Settings Panel Component */}
      <AlertsPanel />
      <div className="my-4 border-t border-gray-200" />
      {/* Change Password Panel Component */}
      <ChangePasswordPanel />
      <div className="my-4 border-t border-gray-200" />
      {/* Privacy Settings Panel Component */}
      <PrivacyPanel />
      <div className="my-4 border-t border-gray-200" />
      {/* Delete Account Panel Component */}
      <DeleteAccountPanel />
    </>
  );
}
