{ config, lib, pkgs, ... }:

let
  vars = import ./vars.nix;
in
{
  imports =
    [
      ./hardware-configuration.nix
      "${builtins.fetchTarball "https://github.com/nix-community/disko/archive/v1.11.0.tar.gz"}/module.nix"
     ./disk-config.nix
    ];

  boot = {
    loader = {
      systemd-boot.enable = true;
      efi = {
        canTouchEfiVariables = true;
        efiSysMountPoint = "/boot";
      };
    };
    initrd.systemd.enable = true;
  };

  systemd.targets.multi-user.enable = true;

  networking.hostName = vars.hostname;
  networking.networkmanager.enable = true;

  time.timeZone = vars.timezone;
  i18n.defaultLocale = vars.locale;

  users = {
    mutableUsers = false;
    users.${vars.username} = {
      isNormalUser = true;
      extraGroups = ["networkmanager" "wheel"];
      openssh.authorizedKeys.keys = [ vars.sshKey ];
    };
  };

  # Enable passwordless sudo.
  security.sudo.extraRules = [
    {
      users = [vars.username];
      commands = [
        {
          command = "ALL";
          options = ["NOPASSWD"];
        }
      ];
    }
  ];

  environment.systemPackages = with pkgs; [
     curl
     git
     vim
     wget
  ];

  # Enable the OpenSSH daemon.
  services.openssh = {
    enable = true;
    settings = {
      PermitRootLogin = "no";
      PasswordAuthentication = false;
    };
  };

  # Disable autologin.
  services.getty.autologinUser = null;

  # Open ports in the firewall.
  networking.firewall.allowedTCPPorts = [ 22 ];
  # networking.firewall.allowedUDPPorts = [ ... ];

  # Disable documentation for minimal install.
  documentation.enable = false;

  # This option defines the first version of NixOS you have installed on this particular machine,
  # and is used to maintain compatibility with application data (e.g. databases) created on older NixOS versions.
  #
  # Most users should NEVER change this value after the initial install, for any reason,
  # even if you've upgraded your system to a new NixOS release.
  #
  # This value does NOT affect the Nixpkgs version your packages and OS are pulled from,
  # so changing it will NOT upgrade your system - see https://nixos.org/manual/nixos/stable/#sec-upgrading for how
  # to actually do that.
  #
  # This value being lower than the current NixOS release does NOT mean your system is
  # out of date, out of support, or vulnerable.
  #
  # Do NOT change this value unless you have manually inspected all the changes it would make to your configuration,
  # and migrated your data accordingly.
  #
  # For more information, see `man configuration.nix` or https://nixos.org/manual/nixos/stable/options#opt-system.stateVersion .
  system.stateVersion = "24.11"; # Did you read the comment?
}
