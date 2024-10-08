#include "../Main.hh"

const string BANNER = R"(
+-----------------------------+
+       Welcome to Purr!      +
+      Developed by Thoq      +
+       &  Contributors       +
+-----------------------------+
)";

bool Purrooser::OnInit() {
  cout << BANNER << endl;
  cout << "Starting Purrooser..." << endl;
  wxLog::SetLogLevel(wxLOG_FatalError);

  auto *frame = new PurrooserFrame("Purr");
  frame->Show(true);
  wxCommandEvent event;
  cout << "Purrooser started successfully!" << endl;
  return true;
}
